import * as Sequelize from "sequelize";

const DB_TABLE_NAME = "signup";
const SEQUELIZE_MODEL_NAME = "Signup";

interface IAttributes {
  id?: number;
  provider: string;
  payload?: any;
  jwtToken?: string;
  accessToken?: string;
  email?: string;
  password: string;
  socialId?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type Instance = Sequelize.Instance<IAttributes> & IAttributes;

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
    provider: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: true
    },
    jwtToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    socialId: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    updatedAt: {
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

  return sequelize.define<Instance, IAttributes>(
    SEQUELIZE_MODEL_NAME,
    attributes,
    options
  );
}

export { DB_TABLE_NAME as DB_TABLE_NAME_SIGNUP };
export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_SIGNUP };
export { IAttributes as Signup };
export { Instance as SignupInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
