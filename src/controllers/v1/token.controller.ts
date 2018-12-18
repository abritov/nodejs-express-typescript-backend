import { PassportStatic } from 'passport';
import { Router, Request, Response } from 'express';
import { CreateToken, AuthorizationToken } from './schema';
import { DbApi } from '../../db';
import { Hasher } from '../../utils/hasher';
import { User } from '../../db/models/User';
import { Jwt, JwtPayload } from './authenticate';
import { TokenRequestAccepted, RecordNotFound, ENTITY_SIGNUP } from './error';
import { SignupEncDec } from './signup.controller';

export class TokenController {
  constructor(public readonly _db: DbApi, public _hasher: Hasher, public _jwt: Jwt) { }

  async create(request: CreateToken, user: User) {
    const accessBitmask = request.accessBitmask || 1;
    if (accessBitmask < 1)
      throw Error("invalid accessBitmask value");
    if (accessBitmask > 1)
      throw new TokenRequestAccepted();
    const token = this._jwt.encrypt(<JwtPayload>{
      userId: user.id!,
      name: user.name,
      accessBitmask
    });
    return token;
  }

  async get(signupId: number) {
    let signup = await this._db.Signup.findById(signupId);
    if (!signup) throw new RecordNotFound(ENTITY_SIGNUP);
    return signup.jwtToken;
  }
}

export function createTokenRouter(controller: TokenController, signupCipher: SignupEncDec, passport: PassportStatic) {
  const router = Router();

  router.post('/insecure', async (req: Request, res: Response) => {
    if (!(req.ip == "127.0.0.1" || req.ip == "::1")) {
      res.status(403).send();
      return;
    }
    try {
      const user = await controller._db.User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(404).json({ error: "user not found" });
        return;
      }
      res.json(controller.create(<CreateToken>req.body, user));
    }
    catch (error) {
      if (error instanceof TokenRequestAccepted) {
        res.status(202).json({ message: "please wait until your token will be approved" });
        return;
      }
      res.status(400).json({ error });
    }
  });

  router.post('/', passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
    try {
      let token = await controller.create(req.body, req.user);
      res.json({ token });
    }
    catch (error) {
      if (error instanceof TokenRequestAccepted) {
        res.status(202).json({ message: "please wait until your token will be approved" });
        return;
      }
      res.status(400).json({ error: error.message || error.stack[0] });
    }
  });

  router.get('/', async (req: Request, res: Response) => {
    try {
      let signup = signupCipher.decode(req.query.encodedSignup);
      let token = await controller.get(signup.id);
      res.status(200).json({ token });
    }
    catch (error) {
      console.error(error);
      if (error instanceof TypeError) {
        res.status(400).send();
        return;
      }
      if (error instanceof RecordNotFound) {
        res.status(404).send();
        return;
      }
    }
  });

  return router;
}