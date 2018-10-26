import * as Sequelize from 'sequelize'

interface Attributes {
  id?: number
  userId?: number
  alias: string
  title: string
  content: string
  createdAt?: Date
  updatedAt?: Date
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
        model: 'user',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: 'part',
  };

  return sequelize.define<Instance, Attributes>('Part', attributes, options)
}

export { Attributes as Part };
export { Instance as PartInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}