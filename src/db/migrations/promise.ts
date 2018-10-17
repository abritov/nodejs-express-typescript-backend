import { QueryInterface, SequelizeStatic } from 'sequelize';
import Bluebird from 'bluebird';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Bluebird<void> {
  return queryInterface.createTable('Users', {}, {});
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Bluebird<void> {
  return queryInterface.dropTable('Users');
};