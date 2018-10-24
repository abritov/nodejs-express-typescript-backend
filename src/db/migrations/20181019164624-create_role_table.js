// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  queryInterface.createTable('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  }).then(() => {
    queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
      },
      {
        name: 'main_redactor'
      },
      {
        name: 'main_translate',
      },
      {
        name: 'redactor',
      },
      {
        name: 'translate',
      },
      {
        name: 'user',
      },
    ]).thenReturn()
  })
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('roles')
};
