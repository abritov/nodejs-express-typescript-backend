import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_BOOK } from "./Book";

const DB_TABLE_NAME = "chapter_publish_graphic";
const SEQUELIZE_MODEL_NAME = "ChapterPublishGraphic";

interface IAttributes {
  bookId?: number;
  purchaseDelaySec: number;
  subscribeDelaySec: number;
  freeAccessDelaySec: number;
}

type Instance = Sequelize.Instance<IAttributes> & IAttributes;

function createInstance(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
) {
  /* tslint:disable */
  const attributes: Sequelize.DefineModelAttributes<IAttributes> = {
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
    purchaseDelaySec: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subscribeDelaySec: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    freeAccessDelaySec: {
      type: DataTypes.INTEGER,
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

export { IAttributes as ChapterPublishGraphic };
export { Instance as ChapterPublishGraphicInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
