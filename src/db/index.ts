import * as os from 'os'
import * as Sequelize from "sequelize"
import * as config from './config'
import userFactory from './models/User'
import staffUserFactory from './models/StaffUser'
import roleFactory from './models/Role'
import userRoleFactory from './models/UserRole'
import userTokenFactory from './models/UserToken'
const env = process.env.NODE_ENV || "development_" + os.userInfo().username
const sequelize = new Sequelize(config[env])

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  StaffUser: staffUserFactory(sequelize),
  Role: roleFactory(sequelize),
  UserRole: userRoleFactory(sequelize),
  UserToken: userTokenFactory(sequelize),
};

(<any>Object).values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
})

export default db