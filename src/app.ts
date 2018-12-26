import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as Sequelize from "sequelize";
import passport = require('passport');
import { Jwt } from './service/v1/authenticate';
import { createSequelizeDb } from './db';
import swaggerSpec from './service/v1/openapi.json';
import {
  createTokenRouter,
  createUserRouter,
  createSignupRouter,
  createJwtStrategy,
  createLocalStrategy,
  createFacebookStrategy,
  UserController,
  SignupController,
  TokenController,
  SignupEncDec
} from './service/v1';
import { MockHasher } from './utils/hasher';
import { SignupTempMemory } from './temp/signup';
import { initializePassport } from './service/v1/authenticate';
import * as config from './config';
import { EnvironmentConfig } from './config/types';
import { createTextRouter, TextController } from './service/v1/text.controller';

const envConfig: EnvironmentConfig = process.env.NODE_ENV == 'production' ? config.production : config.development;

const
  port = 8008,
  app = express(),
  hasher = new MockHasher("mock_salt"),
  db = createSequelizeDb(new Sequelize.default(envConfig.db)),
  jwt = new Jwt(envConfig.jwtSecret),
  signupTemp = new SignupTempMemory(),
  signupCipher = new SignupEncDec(envConfig.signupTokenCipher),
  signupController = new SignupController(db, signupCipher),
  userController = new UserController(db, hasher, signupTemp),
  tokenController = new TokenController(db, hasher, jwt),
  textController = new TextController();


passport.use(createJwtStrategy(db, jwt));
passport.use(createLocalStrategy(db, hasher));
passport.use(createFacebookStrategy(signupController, userController, envConfig.facebook))

app.use(bodyParser.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err });
});

initializePassport(db, app, passport);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/token', createTokenRouter(tokenController, signupCipher, passport));
app.use('/signup', createSignupRouter(signupController, passport));
app.use('/user', createUserRouter(userController, signupController, passport));
app.use('/text', createTextRouter(textController));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});