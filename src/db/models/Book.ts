import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_COUNTRY } from "./Country";
import { SEQUELIZE_MODEL_NAME_GENRE } from "./Genre";

const DB_TABLE_NAME = "books";
const SEQUELIZE_MODEL_NAME = "Book";

interface IAttributes {
  id?: number;
  title: string;
  titleLong: string;
  description: string;
  countryId?: number;
  sourceUrl?: string;
  author: string;
  partnerLink?: string;
  cooperationLetter?: string;
  serviceInfo: string;
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
    title: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    titleLong: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_COUNTRY,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    sourceUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    partnerLink: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cooperationLetter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    serviceInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.default.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
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

export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_BOOK };
export { IAttributes as Book };
export { Instance as BookInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
