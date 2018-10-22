// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('staff_users', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
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
      field: 'rate_translate',
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    rateRedactor: {
      field: 'rate_redactor',
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    adminActivity: {
      field: 'admin_activity',
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
