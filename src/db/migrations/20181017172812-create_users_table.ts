import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.createTable('users', {
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
      },
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
    salt: {
      field: 'salt',
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oldHash: {
      field: 'old_hash',
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
      },
    },
    statusId: {
      field: 'status_id',
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    approved: {
      field: 'approved',
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      field: 'last_login',
      type: Sequelize.DATE,
      allowNull: true,
    },
    createtAt: {
      field: 'createt_at',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  })
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('users')
};
