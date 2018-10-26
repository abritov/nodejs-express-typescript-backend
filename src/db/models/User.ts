import * as Sequelize from 'sequelize'
import { UserTokenInstance, UserToken } from './UserToken';
import { UserRole } from './UserRole';

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
}
type Model = Sequelize.Model<Instance, Attributes>

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
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: 'users',
  };
  const User = sequelize.define<Instance, Attributes>('User', attributes, options)
  User.associate = models => {
    User.hasOne(models.UserToken, { as: 'token', foreignKey: 'userId' });
  }

  return User;
}


function userFactory(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}

export { Attributes as User }
export { Instance as UserInstance }
export { Model as UserModel }
export default userFactory