// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.changeColumn('signup', 'email', {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.changeColumn('signup', 'email', {
    type: Sequelize.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  });
};
