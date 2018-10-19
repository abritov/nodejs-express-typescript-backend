import * as Sequelize from 'sequelize'

interface UserAttributes {
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
  lastLogin: Date,
  createtAt: Date,
}


type UsersInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<UserAttributes> = {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    authKey: {
      field: 'auth_key',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    salt: {
      field: 'salt',
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oldHash: {
      field: 'old_hash',
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordResetToken: {
      field: 'password_reset_token',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    statusId: {
      field: 'status_id',
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
    },
    approved: {
      field: 'approved',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      field: 'last_login',
      type: DataTypes.DATE,
      allowNull: true,
    },
    createtAt: {
      field: 'createt_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  };

  const options = {
    timestamps: false,
    tableName: 'users',
  };
  return sequelize.define<UsersInstance, UserAttributes>('User', attributes, options)
}

function userFactory(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}

export { UserAttributes as User };
export default userFactory;