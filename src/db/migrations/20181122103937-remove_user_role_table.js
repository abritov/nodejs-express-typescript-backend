// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("user_roles");
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.createTable("user_roles", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    }
  });
};
