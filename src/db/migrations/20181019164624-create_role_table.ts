import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
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

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('roles')
};
