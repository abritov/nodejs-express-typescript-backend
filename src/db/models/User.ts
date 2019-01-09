import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_SIGNUP, SignupInstance } from "./Signup";
import { UserTokenInstance } from "./UserToken";

const DB_TABLE_NAME = "users";
const SEQUELIZE_MODEL_NAME = "User";

interface IAttributes {
  id?: number;
  signupId?: number;
  name: string;
  email: string;
  passwordHash?: string;
  approved?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
}

interface Instance extends Sequelize.Instance<IAttributes>, IAttributes {
  getToken: Sequelize.HasOneGetAssociationMixin<UserTokenInstance>;
  getSignup: Sequelize.HasOneGetAssociationMixin<SignupInstance>;
}
interface IModel extends Sequelize.Model<Instance, IAttributes> {}

function createInstance(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
) {
  /* tslint:disable */
  const attributes: Sequelize.DefineModelAttributes<IAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    signupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_SIGNUP,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.default.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  };
  /* tslint:enable */
  const options: Sequelize.DefineOptions<IAttributes> = {
    tableName: DB_TABLE_NAME
  };
  const User = sequelize.define<Instance, IAttributes>(
    SEQUELIZE_MODEL_NAME,
    attributes,
    options
  );
  User.associate = models => {
    User.hasOne(models.UserToken, { as: "token", foreignKey: "userId" });
    User.hasOne(models.Signup, { as: "signup", foreignKey: "id" });
  };

  return User;
}

function userFactory(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}

export { DB_TABLE_NAME as DB_TABLE_NAME_USER };
export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_USER };
export { IAttributes as User };
export { Instance as UserInstance };
export { IModel as UserModel };
export default userFactory;
