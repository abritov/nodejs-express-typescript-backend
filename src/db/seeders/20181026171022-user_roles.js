// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('user_roles', [
    {
      userId: 1,
      roleId: 1,
    },
    {
      userId: 1,
      roleId: 2,
    },
    {
      userId: 1,
      roleId: 3,
    },
    {
      userId: 1,
      roleId: 6,
    },
    {
      userId: 2,
      roleId: 6,
    }
  ])
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('user_roles', null, {});
};
