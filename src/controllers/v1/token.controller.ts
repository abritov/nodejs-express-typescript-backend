import { Router, Request, Response } from 'express';
import { CreateToken, AuthorizationToken } from './schema';
import passport = require('passport');
import { DbApi } from '../../db';

export class TokenController {
  constructor(public db: DbApi) { }

  create(request: CreateToken): AuthorizationToken {
    console.log(request.userId);
    return { token: '123' }
  }
}

export function createTokenRouter(db: DbApi) {
  const router = Router();
  const controller = new TokenController(db);

  router.post('/create-insecure', (req: Request, res) => {
    res.send(controller.create(<CreateToken>req.body));
  });

  router.post('/', passport.authenticate('local', { session: false }), (req: Request, res: Response) => {
    res.send(controller.create(<CreateToken>req.body));
  });

  return router;
}