import { QueryInterface, SequelizeStatic } from 'sequelize';
import Bluebird from 'bluebird';
import db from '../models/index'

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Bluebird<void> {
  return queryInterface.createTable('Users', db.User.attributes, db.User.options);
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Bluebird<void> {
  return queryInterface.dropTable('Users');
};