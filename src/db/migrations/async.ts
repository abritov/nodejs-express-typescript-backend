import { QueryInterface, SequelizeStatic } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {

  return queryInterface.createTable('Users', {}, {});
};

export async function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('Users');
};