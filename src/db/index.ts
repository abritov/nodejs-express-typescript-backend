import * as Sequelize from "sequelize"
import userFactory, { UserInstance, User } from './models/User'
import staffUserFactory, { StaffUser, StaffUserInstance } from './models/StaffUser'
import roleFactory, { Role, RoleInstance } from './models/Role'
import userTokenFactory, { UserToken, UserTokenInstance } from './models/UserToken'
import partFactory, { Part, PartInstance } from './models/Part'
import signupFactory, { SignupInstance, Signup } from "./models/Signup";
import genreFactory, { Genre, GenreInstance } from "./models/Genre";

export interface DbApi {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, User>
  StaffUser: Sequelize.Model<StaffUserInstance, StaffUser>
  Role: Sequelize.Model<RoleInstance, Role>
  UserToken: Sequelize.Model<UserTokenInstance, UserToken>
  Part: Sequelize.Model<PartInstance, Part>
  Signup: Sequelize.Model<SignupInstance, Signup>
  Genre: Sequelize.Model<GenreInstance, Genre>
}

export function createSequelizeDb(sequelize: Sequelize.Sequelize) {

  const db: DbApi = {
    sequelize,
    Sequelize: Sequelize.default,
    User: userFactory(sequelize),
    StaffUser: staffUserFactory(sequelize),
    Role: roleFactory(sequelize),
    UserToken: userTokenFactory(sequelize),
    Part: partFactory(sequelize),
    Signup: signupFactory(sequelize),
    Genre: genreFactory(sequelize)

  };

  (<any>Object).values(db).forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  })

  return db;
}