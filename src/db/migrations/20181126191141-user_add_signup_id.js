// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.addColumn("users", "signupId", {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "signup",
      key: "id"
    },
    onUpdate: "cascade",
    onDelete: "cascade"
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.removeColumn("users", "signupId");
};
