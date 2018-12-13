import * as Sequelize from 'sequelize'
import { SEQUELIZE_MODEL_NAME_USER } from './User';
import { SEQUELIZE_MODEL_NAME_BOOK } from './Book';

const DB_TABLE_NAME = 'book_moderators';
const SEQUELIZE_MODEL_NAME = 'BookModerator';

interface Attributes {
  id?: number
  userId?: number
  bookId?: number
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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_BOOK,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
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

export { Attributes as BookModerator };
export { Instance as BookModeratorInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}