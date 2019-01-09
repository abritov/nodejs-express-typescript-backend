// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("country", [
    {
      name: "Великобритания",
      alias: "England"
    },
    {
      name: "Корея",
      alias: "Korea"
    },
    {
      name: "Китай",
      alias: "China"
    },
    {
      name: "Япония",
      alias: "Japan"
    },
    {
      name: "Россия",
      alias: "Russia"
    },
    {
      name: "США",
      alias: "USA"
    }
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("country", {
    where: {
      id: {
        [Sequelize.Op.gte]: 1
      }
    }
  });
};
