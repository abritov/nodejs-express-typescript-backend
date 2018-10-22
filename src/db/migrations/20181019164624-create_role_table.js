module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('roles', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  })
};

module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('roles')
};
