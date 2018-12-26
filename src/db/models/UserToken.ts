import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_USER } from "./User";

const DB_TABLE_NAME = "user_token";
const SEQUELIZE_MODEL_NAME = "UserToken";

interface Attributes {
  id?: number;
  userId: number;
  token: string;
}

interface Instance extends Sequelize.Instance<Attributes>, Attributes {

}

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
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options);
}

export { Attributes as UserToken };
export { Instance as UserTokenInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
