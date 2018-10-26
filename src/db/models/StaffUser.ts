import * as Sequelize from 'sequelize'

interface Attributes {
  id?: number,
  userId: number,
  rateTranslate: number,
  rateRedactor: number,
  adminActivity: number
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
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
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    rateRedactor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    adminActivity: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: 'staff_users',
  };

  return sequelize.define<Instance, Attributes>('StaffUser', attributes, options)
}

export { Attributes as StaffUser };
export { Instance as StaffUserInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}