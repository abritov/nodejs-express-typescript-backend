// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("genres", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    titleRu: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    titleEn: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("genres");
};
