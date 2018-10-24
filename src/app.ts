import db from './db'


async function main() {
  try {
    let user = await db.User.findById(1, { include: [db.UserToken] });
    // console.log(user.UserToken);
    console.log(await user.getUserToken());
  }
  catch (err) {
    console.log(err)
  }
}

main().catch(e => {
  console.log(e)
})