// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("book_genres", {
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    genreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "genres",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    }
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("book_genres");
};
