import * as Sequelize from 'sequelize'

interface StaffUserAttributes {
  id?: number,
  userId: number,
  rateTranslate: number,
  rateRedactor: number,
  adminActivity: number
}


type StaffUsersInstance = Sequelize.Instance<StaffUserAttributes> & StaffUserAttributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<StaffUserAttributes> = {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    rateRedactor: {
      field: 'rate_redactor',
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    adminActivity: {
      field: 'admin_activity',
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
  };

  const options: Sequelize.DefineOptions<StaffUserAttributes> = {
    timestamps: false,
    tableName: 'staff_users',
  };

  return sequelize.define<StaffUsersInstance, StaffUserAttributes>('StaffUser', attributes, options)
}

export { StaffUserAttributes as StaffUser };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}