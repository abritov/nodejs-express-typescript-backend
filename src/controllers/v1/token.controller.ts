import { Router, Request, Response } from 'express';
import { CreateToken, AuthorizationToken } from './schema';
import passport = require('passport');
import { DbApi } from '../../db';
import { Hasher } from '../../utils/hasher';

export class TokenController {
  constructor(public _db: DbApi, public _hasher: Hasher) { }

  async create(request: CreateToken) {
    const user = await this._db.User.findOne({ where: { email: request.email } });
    if (user) return <AuthorizationToken>{ token: '123' }
  }
}

export function createTokenRouter(db: DbApi, hasher: Hasher) {
  const router = Router();
  const controller = new TokenController(db, hasher);

  router.post('/insecure', (req: Request, res: Response) => {
    if (req.connection.localAddress != "127.0.0.1") {
      res.status(403).send();
      return;
    }
    res.json(controller.create(<CreateToken>req.body));
  });

  router.post('/', passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
    res.json(await controller.create(<CreateToken>req.body));
  });

  return router;
}