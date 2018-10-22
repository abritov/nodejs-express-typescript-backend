module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('user_token', {
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    token: {
      field: 'token',
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    },
  })
};

module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('user_token')
};
