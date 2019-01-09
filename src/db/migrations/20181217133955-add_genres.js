// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("genres", [
    {
      titleRu: "Экшн",
      titleEn: "Action"
    },
    {
      titleRu: "Приключения",
      titleEn: "Adventure"
    },
    {
      titleRu: "Комедия",
      titleEn: "Comedy"
    },
    {
      titleRu: "Спорт",
      titleEn: "Sports"
    },
    {
      titleRu: "Виртуальный Мир",
      titleEn: "Virtual Reality"
    },
    {
      titleRu: "Игра",
      titleEn: "Game"
    },
    {
      titleRu: "Повседневность",
      titleEn: "Slice of Life"
    },
    {
      titleRu: "Романтика",
      titleEn: "Romance"
    },
    {
      titleRu: "Мистика",
      titleEn: "Mystery"
    },
    {
      titleRu: "Фэнтези",
      titleEn: "Fantasy"
    },
    {
      titleRu: "История",
      titleEn: "Historical"
    },
    {
      titleRu: "Трагедия",
      titleEn: "Tragedy"
    },
    {
      titleRu: "Научная Фантастика",
      titleEn: "Sci-Fi"
    },
    {
      titleRu: "Сверхъестественное",
      titleEn: "Supernatural"
    },
    {
      titleRu: "Героическое Фэнтези",
      titleEn: "Heroic Fantasy"
    },
    {
      titleRu: "Драма",
      titleEn: "Drama"
    },
    {
      titleRu: "Боевые Искусства",
      titleEn: "Martial Arts"
    },
    {
      titleRu: "Школьная Жизнь",
      titleEn: "School Life"
    },
    {
      titleRu: "Дзёсэй",
      titleEn: "Josei"
    },
    {
      titleRu: "Смена Пола",
      titleEn: "Gender Bender"
    },
    {
      titleRu: "Xuanhuan",
      titleEn: "Xuanhuan"
    },
    {
      titleRu: "Этти",
      titleEn: "Ecchi"
    },
    {
      titleRu: "Гарем",
      titleEn: "Harem"
    },
    {
      titleRu: "Меха",
      titleEn: "Mecha"
    },
    {
      titleRu: "Сёнэн",
      titleEn: "Shounen"
    },
    {
      titleRu: "Сэйнэн",
      titleEn: "Seinen"
    },
    {
      titleRu: "Психология",
      titleEn: "Psychological"
    },
    {
      titleRu: "Ужасы",
      titleEn: "Horror"
    },
    {
      titleRu: "Xianxia",
      titleEn: "Xianxia"
    },
    {
      titleRu: "Adult",
      titleEn: "Adult"
    },
    {
      titleRu: "Mature",
      titleEn: "Mature"
    },
    {
      titleRu: "Оригинальный сюжет",
      titleEn: "Original Story"
    },
    {
      titleRu: "Боевик",
      titleEn: "Action Movie"
    },
    {
      titleRu: "Сёдзе",
      titleEn: "Shoujo"
    },
    {
      titleRu: "Триллер",
      titleEn: "Thriller"
    },
    {
      titleRu: "Вампиры",
      titleEn: "Vampire"
    },
    {
      titleRu: "Детектив",
      titleEn: "Detective"
    },
    {
      titleRu: "Гендерная Интрига",
      titleEn: "Gender Intrigue"
    }
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("genres", {
    where: {
      id: {
        [Sequelize.Op.gte]: 1
      }
    }
  });
};
