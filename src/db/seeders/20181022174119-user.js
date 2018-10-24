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
      authKey: '1234',
      passwordHash: '5678',
      salt: '####',
      oldHash: 'legacy',
      passwordResetToken: 'eatme',
      statusId: 1,
    },
    {
      name: 'Sam',
      email: 'samgamgee@gmail.com',
      authKey: '1234',
      passwordHash: '5678',
      salt: '####',
      oldHash: 'legacy',
      passwordResetToken: 'eatme',
      statusId: 1,
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
