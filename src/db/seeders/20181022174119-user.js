// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('users', [
    {
      name: 'Jane',
      email: 'maryjane@gmail.com',
      passwordHash: '5678',
    },
    {
      name: 'Sam',
      email: 'samgamgee@gmail.com',
      passwordHash: '5678',
    }
  ])
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('users', null, {});
};
