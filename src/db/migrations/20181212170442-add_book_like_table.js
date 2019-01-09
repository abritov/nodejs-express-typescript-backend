// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("book_like", {
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
    isLike: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("book_like");
};
