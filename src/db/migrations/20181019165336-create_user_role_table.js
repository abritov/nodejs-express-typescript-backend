module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('user_roles', {
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
    roleId: {
      field: 'role_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  })
};

module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('user_roles')
};
