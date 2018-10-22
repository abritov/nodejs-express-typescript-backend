// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('user_token', [
    {
      user_id: 1,
      token: 'zzzzzzzzzzzzzzzzzzzz',
    },
    {
      user_id: 2,
      token: 'lllllllllllllllllllll',
    }
  ])
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('user_token', null, {});
};
