import * as Sequelize from 'sequelize'
import { UserTokenInstance } from './UserToken';
import { UserRoleInstance } from './UserRole';

const DB_TABLE_NAME = 'users';
const SEQUELIZE_MODEL_NAME = 'User';

interface Attributes {
  id?: number,
  name: string,
  email: string,
  authKey: string,
  passwordHash: string,
  salt: string,
  oldHash: string,
  passwordResetToken: string,
  statusId: number,
  approved?: boolean,
  lastLogin?: Date,
  createdAt?: Date,
}


interface Instance extends Sequelize.Instance<Attributes>, Attributes {
  getToken: Sequelize.HasOneGetAssociationMixin<UserTokenInstance>
  getRoles: Sequelize.HasManyGetAssociationsMixin<UserRoleInstance>
}
interface Model extends Sequelize.Model<Instance, Attributes> { }

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    authKey: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oldHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordResetToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    statusId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
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
  const User = sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
  User.associate = models => {
    User.hasOne(models.UserToken, { as: 'token', foreignKey: 'userId' });
    User.hasMany(models.UserRole, { as: 'roles', foreignKey: 'userId' });
  }

  return User;
}


function userFactory(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}

export { DB_TABLE_NAME as DB_TABLE_NAME_USER }
export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_USER }
export { Attributes as User }
export { Instance as UserInstance }
export { Model as UserModel }
export default userFactory