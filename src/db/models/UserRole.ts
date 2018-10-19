import * as Sequelize from 'sequelize'

interface Attributes {
  userId: number,
  roleId: number,
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
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
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user_roles',
  };

  return sequelize.define<Instance, Attributes>('UserRole', attributes, options)
}

export { Attributes as UserRole };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}