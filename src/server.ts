import * as os from 'os';
import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import swaggerSpec from './controllers/v1/openapi.json';
import * as Sequelize from "sequelize";
import { createSequelizeDb } from './db';
import passport = require('passport');
import { createTokenRouter, createJwtStrategy } from './controllers/v1';
import { MockHasher } from './utils/hasher';
import * as config from './db/config'

const env = process.env.NODE_ENV || "development_" + os.userInfo().username;

const port = 8080;
const app = express();
const hasher = new MockHasher("mock_salt");

const db = createSequelizeDb(new Sequelize.default(config.development_sqlite))

passport.use(createJwtStrategy(db));

app.use(bodyParser.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err });
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/token', createTokenRouter(db, hasher));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});