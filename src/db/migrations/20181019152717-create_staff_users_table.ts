import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.createTable('staff_users', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    rateTranslate: {
      field: 'rate_translate',
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    rateRedactor: {
      field: 'rate_redactor',
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    adminActivity: {
      field: 'admin_activity',
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
  })
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  return queryInterface.dropTable('staff_users')
};
