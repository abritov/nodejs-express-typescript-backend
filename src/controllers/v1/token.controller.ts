import { Router, Request, Response } from 'express';
import { CreateToken, AuthorizationToken } from './schema';
import passport = require('passport');
import { DbApi } from '../../db';
import { Hasher } from '../../utils/hasher';
import { User } from '../../db/models/User';
import { Jwt, JwtPayload } from './authenticate';

export class TokenController {
  constructor(public _db: DbApi, public _hasher: Hasher, public _jwt: Jwt) { }

  async create(request: CreateToken, user: User) {
    const accessBitmask = request.accessBitmask || 1;
    const token = this._jwt.encrypt(<JwtPayload>{
      userId: user.id!,
      name: user.name,
      accessBitmask
    });
    return <AuthorizationToken>{ token }
  }
}

export function createTokenRouter(db: DbApi, hasher: Hasher, jwt: Jwt) {
  const router = Router();
  const controller = new TokenController(db, hasher, jwt);

  router.post('/insecure', async (req: Request, res: Response) => {
    if (req.connection.localAddress != "127.0.0.1") {
      res.status(403).send();
      return;
    }
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.json(controller.create(<CreateToken>req.body, user));
  });

  router.post('/', passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
    const user: User = req.user;
    res.json(await controller.create(<CreateToken>req.body, req.user));
  });

  return router;
}