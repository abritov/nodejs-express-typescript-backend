// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    authKey: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    passwordHash: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    salt: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oldHash: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordResetToken: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    statusId: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  })
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('users')
};
