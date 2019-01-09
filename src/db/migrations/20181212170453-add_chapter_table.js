// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("chapters", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
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
    titleRu: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    titleEn: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    translatorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    redactorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("chapters");
};
