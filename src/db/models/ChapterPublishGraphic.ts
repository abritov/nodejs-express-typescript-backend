import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_BOOK } from "./Book";

const DB_TABLE_NAME = "chapter_publish_graphic";
const SEQUELIZE_MODEL_NAME = "ChapterPublishGraphic";

interface Attributes {
  bookId?: number;
  purchaseDelaySec: number;
  subscribeDelaySec: number;
  freeAccessDelaySec: number;
}

type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_BOOK,
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    purchaseDelaySec: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribeDelaySec: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    freeAccessDelaySec: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options);
}

export { Attributes as ChapterPublishGraphic };
export { Instance as ChapterPublishGraphicInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
