// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("signup", [
    {
      provider: "email",
      email: "maryjane@gmail.com",
      password: "123456",
      active: true
    },
    {
      provider: "email",
      email: "samgamgee@gmail.com",
      password: "5555",
      active: true
    }
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkDelete("signup", null, {}),
    queryInterface.sequelize.query("ALTER TABLE signup AUTO_INCREMENT = 1")
  ]);
};
