// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  let addJwtToken = queryInterface.addColumn('signup', 'jwtToken', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
  let addAccessToken = queryInterface.addColumn('signup', 'accessToken', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
  return Promise.all([addJwtToken, addAccessToken]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.removeColumn('signup', 'jwtToken'),
    queryInterface.removeColumn('signup', 'accessToken'),
  ]);
};
