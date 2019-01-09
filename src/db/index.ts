import * as Sequelize from "sequelize";
import bookFactory, { Book, BookInstance } from "./models/Book";
import bookGenreFactory, {
  BookGenre,
  BookGenreInstance
} from "./models/BookGenre";
import bookLikeFactory, { BookLike, BookLikeInstance } from "./models/BookLike";
import bookModeratorFactory, {
  BookModerator,
  BookModeratorInstance
} from "./models/BookModerator";
import chapterFactory, { Chapter, ChapterInstance } from "./models/Chapter";
import chapterPublishFactory, {
  ChapterPublishGraphic,
  ChapterPublishGraphicInstance
} from "./models/ChapterPublishGraphic";
import chapterPurchaseFactory, {
  ChapterPurchase,
  ChapterPurchaseInstance
} from "./models/ChapterPurchase";
import chapterVisitFactory, {
  ChapterVisit,
  ChapterVisitInstance
} from "./models/ChapterVisit";
import countryFactory, { Country, CountryInstance } from "./models/Country";
import genreFactory, { Genre, GenreInstance } from "./models/Genre";
import partFactory, { Part, PartInstance } from "./models/Part";
import roleFactory, { Role, RoleInstance } from "./models/Role";
import signupFactory, { Signup, SignupInstance } from "./models/Signup";
import staffUserFactory, {
  StaffUser,
  StaffUserInstance
} from "./models/StaffUser";
import subscribePurchaseFactory, {
  SubscribePurchase,
  SubscribePurchaseInstance
} from "./models/SubscribePurchase";
import userFactory, { User, UserInstance } from "./models/User";
import userTokenFactory, {
  UserToken,
  UserTokenInstance
} from "./models/UserToken";

export interface IDbApi {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, User>;
  StaffUser: Sequelize.Model<StaffUserInstance, StaffUser>;
  Role: Sequelize.Model<RoleInstance, Role>;
  UserToken: Sequelize.Model<UserTokenInstance, UserToken>;
  Part: Sequelize.Model<PartInstance, Part>;
  Signup: Sequelize.Model<SignupInstance, Signup>;
  Genre: Sequelize.Model<GenreInstance, Genre>;
  Book: Sequelize.Model<BookInstance, Book>;
  BookLike: Sequelize.Model<BookLikeInstance, BookLike>;
  BookModerator: Sequelize.Model<BookModeratorInstance, BookModerator>;
  Chapter: Sequelize.Model<ChapterInstance, Chapter>;
  ChapterPublishGraphic: Sequelize.Model<
    ChapterPublishGraphicInstance,
    ChapterPublishGraphic
  >;
  ChapterPurchase: Sequelize.Model<ChapterPurchaseInstance, ChapterPurchase>;
  ChapterVisit: Sequelize.Model<ChapterVisitInstance, ChapterVisit>;
  Country: Sequelize.Model<CountryInstance, Country>;
  SubscribePurchase: Sequelize.Model<
    SubscribePurchaseInstance,
    SubscribePurchase
  >;
  BookGenre: Sequelize.Model<BookGenreInstance, BookGenre>;
}

export function createSequelizeDb(sequelize: Sequelize.Sequelize) {
  const db: IDbApi = {
    Book: bookFactory(sequelize),
    BookGenre: bookGenreFactory(sequelize),
    BookLike: bookLikeFactory(sequelize),
    BookModerator: bookModeratorFactory(sequelize),
    Chapter: chapterFactory(sequelize),
    ChapterPublishGraphic: chapterPublishFactory(sequelize),
    ChapterPurchase: chapterPurchaseFactory(sequelize),
    ChapterVisit: chapterVisitFactory(sequelize),
    Country: countryFactory(sequelize),
    Genre: genreFactory(sequelize),
    Part: partFactory(sequelize),
    Role: roleFactory(sequelize),
    Sequelize: Sequelize.default,
    Signup: signupFactory(sequelize),
    StaffUser: staffUserFactory(sequelize),
    SubscribePurchase: subscribePurchaseFactory(sequelize),
    User: userFactory(sequelize),
    UserToken: userTokenFactory(sequelize),
    sequelize
  };

  (Object as any).values(db).forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  });

  return db;
}
