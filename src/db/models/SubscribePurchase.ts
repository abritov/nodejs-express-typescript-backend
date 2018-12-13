import * as Sequelize from 'sequelize'
import { SEQUELIZE_MODEL_NAME_USER } from './User';

const DB_TABLE_NAME = 'subscribe_purchase';
const SEQUELIZE_MODEL_NAME = 'SubscribePurchase';

interface Attributes {
  id?: number
  userId?: number
  type: string
  cost: number
  createdAt?: Date
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
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.default.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
}

export { Attributes as SubscribePurchase };
export { Instance as SubscribePurchaseInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}