'use strict';

import * as Sequelize from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config.json")[env];
const url = config.url || process.env.DATABASE_URI;

const sequelize = new Sequelize(url, config);

const db = {
  sequelize,
  Sequelize,
};

(<any>Object).values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
