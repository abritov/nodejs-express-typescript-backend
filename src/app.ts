import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import passport = require("passport");
import * as Sequelize from "sequelize";
import * as swaggerUi from "swagger-ui-express";
import * as config from "./config";
import { IEnvironmentConfig } from "./config/types";
import { createSequelizeDb } from "./db";
import {
  createFacebookStrategy,
  createJwtStrategy,
  createLocalStrategy,
  createSignupRouter,
  createTextRouter,
  createTokenRouter,
  createUserRouter,
  SignupController,
  SignupEncDec,
  TextController,
  TokenController,
  UserController
} from "./service/v1";
import { initializePassport, Jwt } from "./service/v1/authenticate";
import swaggerSpec from "./service/v1/openapi.json";
import { SignupTempMemory } from "./temp/signup";
import { ConsoleLogger, logger, LoggerAdapter, MockHash } from "./utils";

const envConfig: IEnvironmentConfig =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const port = 8008;
const app = express();
const hasher = new MockHash("mock_salt");
const db = createSequelizeDb(new Sequelize.default(envConfig.db));
const jwt = new Jwt(envConfig.jwtSecret);
const signupTemp = new SignupTempMemory();
const signupCipher = new SignupEncDec(envConfig.signupTokenCipher);
const signupController = new SignupController(db, signupCipher);
const userController = new UserController(db, hasher, signupTemp);
const tokenController = new TokenController(db, hasher, jwt);
const textController = new TextController();

LoggerAdapter.instance = new ConsoleLogger();

passport.use(createJwtStrategy(db, jwt));
passport.use(createLocalStrategy(db, hasher));
passport.use(
  createFacebookStrategy(signupController, userController, envConfig.facebook)
);

app.use(bodyParser.json());
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
});

initializePassport(db, app, passport);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/token", createTokenRouter(tokenController, signupCipher, passport));
app.use("/signup", createSignupRouter(signupController, passport));
app.use("/user", createUserRouter(userController, signupController, passport));
app.use("/text", createTextRouter(textController));

app.listen(port, () => {
  logger.log(`Listening at http://localhost:${port}/`);
});
