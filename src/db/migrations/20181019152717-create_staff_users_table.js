// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('staff_users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    rateTranslate: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    rateRedactor: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    adminActivity: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
  })
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('staff_users')
};
