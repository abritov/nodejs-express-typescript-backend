import HttpStatus from "http-status";
import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import passport = require("passport");
import * as Sequelize from "sequelize";
import * as swaggerUi from "swagger-ui-express";
import * as config from "./config";
import { EnvironmentConfig } from "./config/types";
import { createSequelizeDb } from "./db";
import {
  createFacebookStrategy,
  createJwtStrategy,
  createLocalStrategy,
  createSignupRouter,
  createTokenRouter,
  createUserRouter,
  SignupController,
  SignupEncDec,
  TokenController,
  UserController,
} from "./service/v1";
import { Jwt } from "./service/v1/authenticate";
import { initializePassport } from "./service/v1/authenticate";
import swaggerSpec from "./service/v1/openapi.json";
import { createTextRouter, TextController } from "./service/v1/text.controller";
import { SignupTempMemory } from "./temp/signup";
import { MockHasher } from "./utils/hasher";

const envConfig: EnvironmentConfig = process.env.NODE_ENV == "production" ? config.production : config.development;

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
passport.use(createFacebookStrategy(signupController, userController, envConfig.facebook));

app.use(bodyParser.json());
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
});

initializePassport(db, app, passport);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/token", createTokenRouter(tokenController, signupCipher, passport));
app.use("/signup", createSignupRouter(signupController, passport));
app.use("/user", createUserRouter(userController, signupController, passport));
app.use("/text", createTextRouter(textController));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
