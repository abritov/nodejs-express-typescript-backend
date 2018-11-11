import { Router, Request, Response } from 'express';
import { CreateToken, AuthorizationToken } from './schema';
import passport = require('passport');
import { DbApi } from '../../db';

export class TokenController {
  constructor(public _db: DbApi) { }

  create(request: CreateToken): AuthorizationToken {
    console.log(request.userId);
    return { token: '123' }
  }
}

export function createTokenRouter(db: DbApi) {
  const router = Router();
  const controller = new TokenController(db);

  router.post('/insecure', (req: Request, res: Response) => {
    if (req.connection.localAddress != "127.0.0.1") {
      res.status(403).send();
      return;
    }
    res.json(controller.create(<CreateToken>req.body));
  });

  router.post('/', passport.authenticate('local', { session: false }), (req: Request, res: Response) => {
    res.json(controller.create(<CreateToken>req.body));
  });

  return router;
}