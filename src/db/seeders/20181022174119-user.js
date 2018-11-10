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
      passwordHash: 'maryjane@gmail.com.123456.mock_salt',
    },
    {
      name: 'Sam',
      email: 'samgamgee@gmail.com',
      passwordHash: 'samgamgee@gmail.com.5555.mock_salt',
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
