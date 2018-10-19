import { User } from "../db/models/User";
import { StorageApi } from './index';


export default function (store: StorageApi) {
  async function getPasswordResetToken(user: User) {
    throw Error('unimplemented')
  }
  return {
    getPasswordResetToken
  }
}