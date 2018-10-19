import * as Sequelize from "sequelize";
import userFactory from './models/User';
import staffUserFactory from './models/StaffUser'
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config.json")[env];
const url = config.url || process.env.DATABASE_URI;

const sequelize = new Sequelize(url, config);

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  StaffUser: staffUserFactory(sequelize),
};

(<any>Object).values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;