import { UniqueConstraintError } from 'sequelize';
import { PassportStatic } from 'passport';
import { Router, Request, Response } from 'express';
import { DbApi } from '../../db';
import { CreateSignup } from './schema';
import { FacebookSignupResult } from './authenticate';

const SIGNUP_CIPHER_ALGORITHM = 'aes192';

interface SignupToken {
  id: number
  socialId?: string
  email?: string
}

export class SignupController {
  constructor(public _db: DbApi, public _signupSecret: string) { }

  encodeRequest(req: SignupToken) {
    let aes = createCipher(SIGNUP_CIPHER_ALGORITHM, this._signupSecret);
    aes.update(JSON.stringify(req), 'utf8', 'hex');
    return aes.final('hex');
  }

  decodeRequest(req: string): SignupToken {
    let aes = createDecipher(SIGNUP_CIPHER_ALGORITHM, this._signupSecret);
    aes.update(req, 'hex', 'utf8');
    let decoded = aes.final('utf8');
    return JSON.parse(decoded);
  }

  async create(request: CreateSignup, provider: string, active: boolean) {
    return this._db.Signup.create({
      active,
      provider,
      email: request.email,
      payload: request.payload,
      socialId: request.socialId,
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
    // we do not get here
  });

  router.get('/fb/callback', passport.authenticate('facebook', { session: false }), async (req: Request, res: Response) => {
    let result: FacebookSignupResult = req.user;
    console.error(result.error);
    if (result.error) {
      if (result.error instanceof UniqueConstraintError) {
        res.status(422).send({ error: "this account is already used" });
        return;
      }
      res.status(400).send();
      return;
    }
    let encodedSignup = controller.encodeRequest({
      id: result.signup!.id!,
      email: result.signup!.email,
      socialId: result.signup!.socialId
    });
    res.status(200).send({ signup: encodedSignup });
  });

  router.post('/decode', (req: Request, res: Response) => {
    res.send(controller.decodeRequest(req.body.signup));
  });

  return router;
}