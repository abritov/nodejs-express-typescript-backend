// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.removeColumn("books", "titleRu"),
    queryInterface.removeColumn("books", "titleEn"),
    queryInterface.removeColumn("books", "titleLongRu"),
    queryInterface.removeColumn("books", "titleLongEn"),
    queryInterface.addColumn("books", "title", {
      type: Sequelize.STRING(512),
      allowNull: false
    }),
    queryInterface.addColumn("books", "titleLong", {
      type: Sequelize.TEXT,
      allowNull: false
    })
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.removeColumn("books", "title"),
    queryInterface.removeColumn("books", "titleLong"),
    queryInterface.addColumn("books", "titleRu", {
      type: Sequelize.STRING(255),
      allowNull: false
    }),
    queryInterface.addColumn("books", "titleEn", {
      type: Sequelize.STRING(255),
      allowNull: false
    }),
    queryInterface.addColumn("books", "titleLongRu", {
      type: Sequelize.TEXT,
      allowNull: false
    }),
    queryInterface.addColumn("books", "titleLongEn", {
      type: Sequelize.TEXT,
      allowNull: false
    })
  ]);
};
