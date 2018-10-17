import { QueryInterface, SequelizeStatic } from 'sequelize';
import db from '../models/index'

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable('Users', db.User.attributes, db.User.options);
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.dropTable('Users');
  },
};