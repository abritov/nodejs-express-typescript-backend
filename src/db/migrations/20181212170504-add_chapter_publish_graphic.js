// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("chapter_publish_graphic", {
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
    purchaseDelaySec: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    subscribeDelaySec: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    freeAccessDelaySec: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("chapter_publish_graphic");
};
