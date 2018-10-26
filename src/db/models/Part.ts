import * as Sequelize from 'sequelize'
import { SEQUELIZE_MODEL_NAME_USER } from './User';

const DB_TABLE_NAME = 'part';
const SEQUELIZE_MODEL_NAME = 'Part';

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
        model: SEQUELIZE_MODEL_NAME_USER,
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
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
}

export { Attributes as Part };
export { Instance as PartInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}