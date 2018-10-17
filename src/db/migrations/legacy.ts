import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable('Users', {}, {});
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.dropTable("Users");
  },
};