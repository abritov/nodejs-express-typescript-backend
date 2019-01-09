import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_USER } from "./User";

const DB_TABLE_NAME = "country";
const SEQUELIZE_MODEL_NAME = "Country";

interface IAttributes {
  id?: number;
  name: string;
  alias: string;
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(255),
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

export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_COUNTRY };
export { IAttributes as Country };
export { Instance as CountryInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
