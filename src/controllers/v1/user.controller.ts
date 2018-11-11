import passport = require('passport');
import { Router, Request } from 'express';
import { DbApi } from '../../db/index';
import { CreateUser } from './schema';

export class UserController {
  constructor(public db: DbApi) { }

  create(request: CreateUser) {
    // this.db.User.create({ name: request.name });
  }
}

export function createUserRouter(db: DbApi) {
  const router = Router();
  const controller = new UserController(db);

  router.post('/', (req: Request, res) => {
    res.json(controller.create(<CreateUser>req.body));
  });

  router.post('/vk', passport.authenticate('vkontakte', { session: false }), (req: Request, res) => {
    res.json(controller.create(<CreateUser>req.body));
  });

  return router;
}