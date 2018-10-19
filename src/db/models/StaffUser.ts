import * as Sequelize from 'sequelize'

interface Attributes {
  id?: number,
  userId: number,
  rateTranslate: number,
  rateRedactor: number,
  adminActivity: number
}


type StaffUsersInstance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
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

  const options: Sequelize.DefineOptions<Attributes> = {
    timestamps: false,
    tableName: 'staff_users',
  };

  return sequelize.define<StaffUsersInstance, Attributes>('StaffUser', attributes, options)
}

export { Attributes as StaffUser };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}