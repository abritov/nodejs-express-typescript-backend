import * as Sequelize from "sequelize";

const DB_TABLE_NAME = "genres";
const SEQUELIZE_MODEL_NAME = "Genre";

interface IAttributes {
  id?: number;
  titleRu: string;
  titleEn: string;
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
    titleRu: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titleEn: {
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

export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_GENRE };
export { IAttributes as Genre };
export { Instance as GenreInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
