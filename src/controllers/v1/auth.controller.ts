import { Router, Request } from 'express';
import { AuthSignUp, AuthorizationToken } from './schema';
import { StrategyOptions, Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import * as vk from 'passport-vkontakte';
import passport = require('passport');
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

export function createVkStrategy(db: DbApi, clientID: string, clientSecret: string, callbackURL: string) {
  return new vk.Strategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, params, profile, done) => {
    console.log(accessToken, refreshToken, params, profile);
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

  passport.use(createJwtStrategy(db));
  passport.use(createVkStrategy(db, '6089541', '556be07b556be07b556be07b1355370b3e5556b556be07b0c3bf286237a2ac5a17ec8f0', 'http://localhost:8008/auth/vk/success'))

  router.post('/signup', (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  router.post('/vk', passport.authenticate('vkontakte'), (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  return router;
}