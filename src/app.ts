import db from './db'


async function main() {
  try {
    let user = await db.User.findById(1);
    console.log(user);
    let token = await user.getToken();
    console.log(token);
  }
  catch (err) {
    console.log(err)
  }
}

main().catch(e => {
  console.log(e)
})