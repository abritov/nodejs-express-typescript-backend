// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.changeColumn("books", "sourceUrl", {
      type: Sequelize.TEXT,
      allowNull: true
    }),
    queryInterface.changeColumn("books", "partnerLink", {
      type: Sequelize.TEXT,
      allowNull: true
    }),
    queryInterface.changeColumn("books", "cooperationLetter", {
      type: Sequelize.TEXT,
      allowNull: true
    })
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.changeColumn("books", "sourceUrl", {
      type: Sequelize.TEXT,
      allowNull: false
    }),
    queryInterface.changeColumn("books", "partnerLink", {
      type: Sequelize.TEXT,
      allowNull: false
    }),
    queryInterface.changeColumn("books", "cooperationLetter", {
      type: Sequelize.TEXT,
      allowNull: false
    })
  ]);
};
