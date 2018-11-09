import { Router, Request } from 'express';
import { AuthSignUp, AuthorizationToken } from './schema';
import { StrategyOptions, Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { DbApi } from '../../db';

interface JwtPayload {
  userId: number,
  roleId: number,
  name: string
}

export function createJwtStrategy(db: DbApi, secret?: string) {

  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret || 'SCugV4e4Z6DTZzXmfYbHqh9KlblOSHVL8tpqy0gO3+W7ylryT',
    algorithms: ['HS256']
  };
  return new Strategy(jwtOptions, async (payload: JwtPayload, done: VerifiedCallback) => {
    const user = await db.User.findById(payload.userId);
    if (user) {
      return done(null, user);
    }
    return done('cannot find user', null);
  });

}

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