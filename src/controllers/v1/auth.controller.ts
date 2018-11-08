import { Router, Request } from 'express';
import { AuthSignUp, AuthorizationToken } from './schema';
import { DbApi } from '../../db';

export class AuthController {
  db: DbApi;

  constructor(db: DbApi) {
    this.db = db;
  }

  signup(request: AuthSignUp): AuthorizationToken {
    console.log(request.issuer);
    return { token: '123' }
  }
}

export function createAuthRouter(db: DbApi) {
  const router = Router();
  const controller = new AuthController(db);

  router.post('/signup', (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  return router;
}