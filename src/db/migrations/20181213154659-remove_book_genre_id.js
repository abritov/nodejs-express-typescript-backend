// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.removeColumn("books", "genreId");
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.addColumn("books", "genreId", {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "genres",
      key: "id"
    },
    onUpdate: "cascade",
    onDelete: "cascade"
  });
};
