import * as os from 'os'
import * as Sequelize from "sequelize"
import { createSequelizeDb } from './db'
import * as config from './db/config'

const env = process.env.NODE_ENV || "development_" + os.userInfo().username;
const db = createSequelizeDb(new Sequelize(config[env]));

async function main() {
  try {
    let user = await db.User.findById(1);
    // console.log(user.UserToken);
    let token = await user.getToken();
    console.log(token);
    // console.log(user.token);
  }
  catch (err) {
    console.log(err)
  }
}

main().catch(e => {
  console.log(e)
})