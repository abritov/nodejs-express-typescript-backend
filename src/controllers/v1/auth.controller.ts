import { Router, Request } from 'express';
import { AuthSignUp, AuthorizationToken } from './schema';
import { StrategyOptions, Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import passport = require('passport');
import { Strategy as VkStrategy } from 'passport-vkontakte';
import { Strategy as LocalStrategy } from 'passport-local';
import { DbApi } from '../../db';
import { Hasher } from '../../utils/hasher';

interface JwtPayload {
  userId: number
  name: string
  accessBitmask: number
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

export function createLocalStrategy(db: DbApi, hasher: Hasher) {
  return new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) return done(null, false);
        if (!hasher.validate(email + "." + password, user.passwordHash))
          return done(null, false);
        return done(null, user);
      }
      catch (err) {
        return done(err);
      }
    }
  );
}

export function createVkStrategy(db: DbApi, clientID: string, clientSecret: string, callbackURL: string) {
  return new VkStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, params, profile, done) => {
    console.log(accessToken, refreshToken, params, profile);
  });
}

export function createAuthRouter(db: DbApi, hasher: Hasher) {
  const router = Router();
  const controller = new AuthController(db);

  passport.use(createJwtStrategy(db));
  passport.use(createLocalStrategy(db, hasher));
  passport.use(createVkStrategy(db, '6089541', '556be07b556be07b556be07b1355370b3e5556b556be07b0c3bf286237a2ac5a17ec8f0', 'http://localhost:8008/auth/vk/success'))

  router.post('/signup', (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  router.post('/vk', passport.authenticate('vkontakte', { session: false }), (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  router.post('/default', passport.authenticate('local', { session: false }), (req: Request, res) => {
    res.send(controller.signup(<AuthSignUp>req.body));
  });

  return router;
}