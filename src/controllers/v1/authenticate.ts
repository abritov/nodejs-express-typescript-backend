import { Strategy as VkStrategy } from 'passport-vkontakte';
import { Strategy as LocalStrategy } from 'passport-local';
import jwtToken from 'jsonwebtoken';
import {
  StrategyOptions as JwtStrategyOptions,
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback as JwtVerifiedCallback
} from 'passport-jwt';
import { DbApi } from '../../db/index';
import { Hasher } from '../../utils/hasher';

export interface JwtPayload {
  userId: number
  name: string
  accessBitmask: number
}

export class Jwt {
  constructor(public secret: string, public algorithm?: string) {
    this.algorithm = algorithm || "HS256";
  }

  encrypt(data: JwtPayload) {
    return jwtToken.sign(data, this.secret, { algorithm: this.algorithm })
  }

  toJwtStrategyOptions(): JwtStrategyOptions {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret,
      algorithms: [this.algorithm!]
    };
  }
}

export function createJwtStrategy(db: DbApi, jwt: Jwt) {
  return new JwtStrategy(jwt.toJwtStrategyOptions(), async (payload: JwtPayload, done: JwtVerifiedCallback) => {
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
        if (!hasher.validate(email + "." + password, user.passwordHash!))
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
    done(null, profile);
  });
}