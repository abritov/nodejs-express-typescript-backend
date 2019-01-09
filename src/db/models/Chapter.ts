import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_BOOK } from "./Book";
import { SEQUELIZE_MODEL_NAME_USER } from "./User";

const DB_TABLE_NAME = "chapters";
const SEQUELIZE_MODEL_NAME = "Chapter";

interface IAttributes {
  id?: number;
  bookId?: number;
  titleRu: string;
  titleEn: string;
  translatorId?: number;
  redactorId?: number;
  content: string;
  isComplete: boolean;
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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_BOOK,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    titleRu: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titleEn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    translatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_USER,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    redactorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_USER,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
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

export { SEQUELIZE_MODEL_NAME as SEQUELIZE_MODEL_NAME_CHAPTER };
export { IAttributes as Chapter };
export { Instance as ChapterInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
