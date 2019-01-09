import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_USER } from "./User";

const DB_TABLE_NAME = "forbid";
const SEQUELIZE_MODEL_NAME = "Forbid";

interface IAttributes {
  id?: number;
  userId?: number;
  action: string;
  reason: string;
  endsAt: Date;
  createdAt?: Date;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_USER,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    endsAt: {
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

export { IAttributes as Forbid };
export { Instance as ForbidInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
