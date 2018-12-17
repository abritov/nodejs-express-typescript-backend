import * as Sequelize from 'sequelize'
import { SEQUELIZE_MODEL_NAME_BOOK } from './Book';
import { SEQUELIZE_MODEL_NAME_GENRE } from './Genre';

const DB_TABLE_NAME = 'book_genres';
const SEQUELIZE_MODEL_NAME = 'BookGenre';

interface Attributes {
  bookId?: number
  genreId?: number
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_BOOK,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_GENRE,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: DB_TABLE_NAME,
  };

  return sequelize.define<Instance, Attributes>(SEQUELIZE_MODEL_NAME, attributes, options)
}

export { Attributes as BookGenre };
export { Instance as BookGenreInstance };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}