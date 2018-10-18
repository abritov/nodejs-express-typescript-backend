import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.createTable('Users', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    authKey: {
      field: 'auth_key',
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    passwordHash: {
      field: 'password_hash',
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    passwordResetToken: {
      field: 'password_reset_token',
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    email: {
      field: 'email',
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.INTEGER(10),
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.INTEGER(10),
      allowNull: false,
    },
  })
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('Users')
};
