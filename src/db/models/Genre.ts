import * as Sequelize from 'sequelize';

const DB_TABLE_NAME = 'genres';
const SEQUELIZE_MODEL_NAME = 'Genre';

interface Attributes {
  id?: number
  titleRu: string
  titleEn: string
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titleRu: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    titleEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
}

export { Attributes as Genre };
export { Instance as GenreInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}