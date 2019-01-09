// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("signup", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    provider: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    payload: {
      type: Sequelize.JSON,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  return queryInterface.dropTable("signup");
};
