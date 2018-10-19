import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
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

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('user_token')
};
