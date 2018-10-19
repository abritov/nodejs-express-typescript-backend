import * as Sequelize from 'sequelize'

interface Attributes {
  id?: number,
  name: string
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    timestamps: false,
    freezeTableName: true,
    tableName: 'roles',
  };

  return sequelize.define<Instance, Attributes>('Role', attributes, options)
}

export { Attributes as Role };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}