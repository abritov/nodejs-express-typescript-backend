import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_USER } from "./User";

const DB_TABLE_NAME = "staff_users";
const SEQUELIZE_MODEL_NAME = "StaffUser";

interface IAttributes {
  id?: number;
  userId: number;
  rateTranslate: number;
  rateRedactor: number;
  adminActivity: number;
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
    rateTranslate: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0
    },
    rateRedactor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0
    },
    adminActivity: {
      type: DataTypes.INTEGER(10),
      allowNull: true
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

export { IAttributes as StaffUser };
export { Instance as StaffUserInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
