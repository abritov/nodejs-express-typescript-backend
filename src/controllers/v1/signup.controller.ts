import passport = require('passport');
import { Router, Request, Response } from 'express';
import { DbApi } from '../../db';
import { CreateUserSignup } from './schema';
import { JwtPayload } from './authenticate';

export class SignupController {
  constructor(public _db: DbApi) { }

  async create(request: CreateUserSignup, userId: number, active: boolean) {
    return this._db.Signup.create({
      userId,
      active,
      provider: request.provider,
      payload: request.payload,
    })
  }
}

export function createSignupRouter(controller: SignupController) {
  const router = Router();

  router.post('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const jwtToken: JwtPayload = req.user;
    const signup = await controller.create(req.body, jwtToken.userId, true);
    res.send();
  });

  return router;
}