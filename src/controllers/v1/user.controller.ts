import passport = require('passport');
import { UniqueConstraintError } from 'sequelize';
import { Router, Request } from 'express';
import { DbApi } from '../../db/index';
import { CreateUser } from './schema';
import { Hasher } from '../../utils/hasher';

export class UserController {
  constructor(public _db: DbApi, public _hasher: Hasher) { }

  makeSocialPassword(accessToken: string) {
    return this._hasher.createHash(accessToken);
  }

  async createSignupRecord(user: User, provider: string, payload: any, active: boolean) {
    return this._db.Signup.create({
      userId: user.id!,
      provider,
      payload,
      active
    })
  }

  async create(request: CreateUser) {
    const passwordHash = this._hasher.createHash(this._hasher.prepareCredentials(request.email, request.password));
    const user = await this._db.User.create({
      name: request.name,
      email: request.email,
      passwordHash
    });
    return {
      name: user.name,
      email: user.email
    };
  }
}

export function createUserRouter(controller: UserController) {
  const router = Router();

  router.post('/', async (req: Request, res) => {
    try {
      res.json(await controller.create(<CreateUser>req.body));
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(422).json({ error: "user already exists" });
      }
    }
  });

  router.post('/vk', passport.authenticate('vkontakte', { session: false }), async (req: Request, res) => {
    res.json(await controller.create(<CreateUser>req.body));
  });

  router.get('/vk/callback', async (req: Request, res) => {
    console.log(req.body);
  });

  router.post('/fb', passport.authenticate('facebook', { session: false }), async (req: Request, res) => {
    res.json(await controller.create(<CreateUser>req.body));
  });

  router.get('/fb/callback', async (req: Request, res) => {
    console.log(req.body);
  });

  return router;
}