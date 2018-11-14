// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING(255),
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  });
};
