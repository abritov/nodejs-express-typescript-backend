import * as Sequelize from "sequelize";

const DB_TABLE_NAME = "book_stat";
const SEQUELIZE_MODEL_NAME = "BookStatView";

interface Attributes {
  bookId?: number;
  views: number;
  rating: number;
  likes: number;
  dislikes: number;
  chaptersCount: number;
  readersCount: number;
  lastPurchaseAt?: Date;
}

type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chaptersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastPurchaseAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options);
}

export { Attributes as BookStatView };
export { Instance as BookStatViewInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
