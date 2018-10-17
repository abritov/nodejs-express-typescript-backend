import { QueryInterface, SequelizeStatic } from 'sequelize';
import * as Promise from 'bluebird';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Promise<void> {
  return queryInterface.createTable('Users', {}, {});
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic): Promise<void> {
  return queryInterface.dropTable('Users');
};