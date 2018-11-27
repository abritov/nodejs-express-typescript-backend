import { PassportStatic } from 'passport';
import { Router, Request, Response } from 'express';
import { DbApi } from '../../db';
import { CreateSignup } from './schema';

export class SignupController {
  constructor(public _db: DbApi) { }

  async create(request: CreateSignup, provider: string, active: boolean) {
    return this._db.Signup.create({
      active,
      provider,
      email: request.email,
      payload: request.payload,
      accessToken: request.accessToken,
    })
  }
}

export function createSignupRouter(controller: SignupController, passport: PassportStatic) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const signup = await controller.create(req.body, 'email', false);
    res.send(signup);
  });

  router.get('/fb', passport.authenticate('facebook', { session: false }), async (req: Request, res: Response) => {
    // we do not get there
  });

  router.get('/fb/callback', passport.authenticate('facebook', { session: false }), async (req: Request, res: Response) => {
    res.status(200).send(req.user);
  });

  return router;
}