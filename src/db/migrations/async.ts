import { QueryInterface, SequelizeStatic } from 'sequelize';
import db from '../models/index'

export async function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.createTable('Users', db.User.attributes, db.User.options);
};

export async function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('Users');
};