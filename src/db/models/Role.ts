import * as Sequelize from "sequelize";

const DB_TABLE_NAME = "roles";
const SEQUELIZE_MODEL_NAME = "Role";

interface IAttributes {
  id?: number;
  name: string;
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
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
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

export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_ROLE };
export { IAttributes as Role };
export { Instance as RoleInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
