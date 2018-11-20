import * as os from 'os';
import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as Sequelize from "sequelize";
import passport = require('passport');
import { Jwt } from './controllers/v1/authenticate';
import { createSequelizeDb } from './db';
import swaggerSpec from './controllers/v1/openapi.json';
import {
  createTokenRouter,
  createUserRouter,
  createJwtStrategy,
  createVkStrategy,
  createLocalStrategy,
  createFacebookStrategy,
  UserController
} from './controllers/v1';
import { MockHasher } from './utils/hasher';
import { SignupTempMemory } from './temp/signup';
import { initializePassport } from './controllers/v1/authenticate';
import * as config from './db/config';
import { createSignupRouter, SignupController } from './controllers/v1/signup.controller';

const env = process.env.NODE_ENV || "development_" + os.userInfo().username;
console.log(`starting server using ${env} env`);

const
  port = 8008,
  app = express(),
  hasher = new MockHasher("mock_salt"),
  db = createSequelizeDb(new Sequelize.default(config[env])),
  jwt = new Jwt('SCugV4e4Z6DTZzXmfYbHqh9KlblOSHVL8tpqy0gO3+W7ylryT'),
  signupTemp = new SignupTempMemory(),
  signupController = new SignupController(db),
  userController = new UserController(db, hasher, signupTemp);


passport.use(createJwtStrategy(db, jwt));
passport.use(createLocalStrategy(db, hasher));

app.use(bodyParser.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err });
});

initializePassport(db, app, passport);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/token', createTokenRouter(db, hasher, jwt));
app.use('/signup', createSignupRouter(signupController));
app.use('/user', createUserRouter(userController));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});