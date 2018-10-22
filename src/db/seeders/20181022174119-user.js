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
      auth_key: '1234',
      password_hash: '5678',
      salt: '####',
      old_hash: 'legacy',
      password_reset_token: 'eatme',
      status_id: 1,
    },
    {
      name: 'Sam',
      email: 'samgamgee@gmail.com',
      auth_key: '1234',
      password_hash: '5678',
      salt: '####',
      old_hash: 'legacy',
      password_reset_token: 'eatme',
      status_id: 1,
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
