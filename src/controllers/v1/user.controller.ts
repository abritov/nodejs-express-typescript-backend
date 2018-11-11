import passport = require('passport');
import { Router, Request } from 'express';
import { DbApi } from '../../db/index';
import { CreateUser } from './schema';
import { Hasher } from '../../utils/hasher';

export class UserController {
  constructor(public _db: DbApi, public _hasher: Hasher) { }

  async create(request: CreateUser) {
    const passwordHash = this._hasher.createHash(request.email + '.' + request.password);
    const user = await this._db.User.create({
      name: request.name,
      email: request.email,
      passwordHash
    });
    return user;
  }
}

export function createUserRouter(db: DbApi, hasher: Hasher) {
  const router = Router();
  const controller = new UserController(db, hasher);

  router.post('/', async (req: Request, res) => {
    res.json(await controller.create(<CreateUser>req.body));
  });

  router.post('/vk', passport.authenticate('vkontakte', { session: false }), async (req: Request, res) => {
    res.json(await controller.create(<CreateUser>req.body));
  });

  return router;
}