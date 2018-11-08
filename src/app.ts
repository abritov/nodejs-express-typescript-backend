import * as os from 'os'
import * as Sequelize from "sequelize"
import { createSequelizeDb } from './db'
import * as config from './db/config'

const env = process.env.NODE_ENV || "development_" + os.userInfo().username;
const db = createSequelizeDb(new Sequelize.default(config["development_sqlite"]));

async function main() {
  try {
    let user = await db.User.findById(1);
    // console.log(user.UserToken);
    if (user) {
      let token = await user.getToken();
      console.log(token);
      let roles = await user.getRoles();
      console.log(roles);
    }
  }
  catch (err) {
    console.log(err)
  }
}

main().catch(e => {
  console.log(e)
})