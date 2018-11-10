// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.removeColumn('users', 'authKey'),
    queryInterface.removeColumn('users', 'salt'),
    queryInterface.removeColumn('users', 'oldHash'),
    queryInterface.removeColumn('users', 'passwordResetToken'),
    queryInterface.removeColumn('users', 'statusId')
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.addColumn('users', 'authKey', {
      type: Sequelize.STRING(255),
      allowNull: true,
    }),
    queryInterface.addColumn('users', 'salt', {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }),
    queryInterface.addColumn('users', 'oldHash', {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }),
    queryInterface.addColumn('users', 'passwordResetToken', {
      type: Sequelize.STRING(255),
      allowNull: true,
    }),
    queryInterface.addColumn('users', 'statusId', {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    })
  ]);
};
