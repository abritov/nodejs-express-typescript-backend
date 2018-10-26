import * as Sequelize from "sequelize"
import userFactory, { UserInstance, User } from './models/User'
import staffUserFactory, { StaffUser, StaffUserInstance } from './models/StaffUser'
import roleFactory, { Role, RoleInstance } from './models/Role'
import userRoleFactory, { UserRole, UserRoleInstance } from './models/UserRole'
import userTokenFactory, { UserToken, UserTokenInstance } from './models/UserToken'
import partFactory, { Part, PartInstance } from './models/Part'

export interface DbApi {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, User>
  StaffUser: Sequelize.Model<StaffUserInstance, StaffUser>
  Role: Sequelize.Model<RoleInstance, Role>
  UserRole: Sequelize.Model<UserRoleInstance, UserRole>
  UserToken: Sequelize.Model<UserTokenInstance, UserToken>
  Part: Sequelize.Model<PartInstance, Part>
}

export function createSequelizeDb(sequelize: Sequelize.Sequelize) {

  const db: DbApi = {
    sequelize,
    Sequelize,
    User: userFactory(sequelize),
    StaffUser: staffUserFactory(sequelize),
    Role: roleFactory(sequelize),
    UserRole: userRoleFactory(sequelize),
    UserToken: userTokenFactory(sequelize),
    Part: partFactory(sequelize),
  };

  (<any>Object).values(db).forEach(model => {
    if (model.associate) {
      model.associate(db);
    }
  })

  return db;
}