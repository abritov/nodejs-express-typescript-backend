// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("part", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    alias: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
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
  return queryInterface.dropTable("part");
};
