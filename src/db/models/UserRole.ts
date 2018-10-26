import * as Sequelize from 'sequelize'
import { SEQUELIZE_MODEL_NAME_USER } from './User';
import { SEQUELIZE_MODEL_NAME_ROLE } from './Role';

const DB_TABLE_NAME = 'user_roles';
const SEQUELIZE_MODEL_NAME = 'UserRole';

interface Attributes {
  userId: number,
  roleId: number,
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_USER,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_ROLE,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
}

export { Attributes as UserRole };
export { Instance as UserRoleInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}