// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("users", [
    {
      name: "Jane",
      email: "maryjane@gmail.com",
      passwordHash: "maryjane@gmail.com.123456.mock_salt",
      signupId: 1
    },
    {
      name: "Sam",
      email: "samgamgee@gmail.com",
      passwordHash: "samgamgee@gmail.com.5555.mock_salt",
      signupId: 2
    }
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkDelete("users", null, {}),
    queryInterface.sequelize.query("ALTER TABLE users AUTO_INCREMENT = 1")
  ]);
};
