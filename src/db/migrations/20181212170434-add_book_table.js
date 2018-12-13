// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('books',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titleRu: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      titleEn: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      titleLongRu: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      titleLongEn: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'country',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      sourceUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      partnerLink: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cooperationLetter: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      serviceInfo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('books');
};
