// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("books", [
    {
      title:
        "Восставший против неба / Against the Gods / ATG / Heaven Defying Evil God",
      titleLong:
        "Восставший против неба, Восставший против небес, Ni Tian Xie Shen, Against the Gods, ATG",
      description:
        "<p>Убегая от погони, юноша прыгает с обрыва, чтобы доставшееся ему сокровище не попало в руки преследователей. Очнувшись, он обнаруживает себя в теле юноши с таким же именем в другом мире. К счастью, ему удалось сохранить и сокровище.</p>",
      countryId: 3,
      author: "Mars Gravity",
      serviceInfo:
        "<p>Статус произведения:В процессе выхода<br></p><p>Статус перевода: Активен</p><p>Количество глав: более 1200</p>"
    },
    {
      title: "Реинкарнатор / Reincarnator",
      titleLong:
        "Восставший против неба, Восставший против небес, Ni Tian Xie Shen, Against the Gods, ATG",
      description:
        '<p>Создав новый мир "Бездна", Бог заселил его новыми созданиями, а затем переместил в него всё человечество. И вот, спустя 50 лет, в живых осталось всего четыре человека, которые и выбрали одного, отправившегося в прошлое, чтобы спасти человечество. Таким образом, Кан Хансу вернулся на 25 лет назад, когда ему было двадцать и пришел его черед отправляться в Бездну. У него осталось всего пять лет до того момента, когда все человечество будет перенесено в этот дикий мир, в котором уже обитают далеко недружественные расы и существа.<br></p>',
      countryId: 2,
      author: "ALLA",
      sourceUrl: "http://www.vdppl.ru/chapter/1309",
      serviceInfo:
        "<p>Статус произведения:&nbsp;Завершено</p><p></p><p>Статус перевода:&nbsp;Активен</p><p></p><p>Количество глав: 489</p>"
    },
    {
      title:
        "Буря Звёздной Войны / Tempest of the Stellar War / Stellar War Storm ",
      titleLong:
        "Буря Звёздной Войны, Tempest of the Stellar War, Stellar War Storm, ",
      description:
        "<p>В далеком будущем империи человечества охватили всю галактику, и великолепная планета Земля превратилась в захолустье на окраине. В азиатском городе Шанцзинь мечты Ван Чжэна стать пилотом меха рухнули, когда на вступительном экзамене в колледже его генетическая оценка оказалась равной двадцати восьми, что едва ли выше, чем у животных. Что еще хуже, людям казалось, что он пытался покончить жизнь самоубийством после того, как оказался отвергнутым красотками-однокурсницами. В этот момент ближайший к его семье человек, старик в книжном магазине через дорогу, пропал без вести, оставив ему только таинственный подарок на день рождения.<br></p>",
      countryId: 3,
      author: "Skeleton Wizard",
      sourceUrl: "http://www.vdppl.ru/chapter/1309",
      serviceInfo:
        "<p>Статус произведения: Завершено</p><p>Статус перевода: Активен</p><p>Количество глав: 1389</p>"
    }
  ]);
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkDelete("books", null, {}),
    queryInterface.sequelize.query("ALTER TABLE books AUTO_INCREMENT = 1")
  ]);
};
