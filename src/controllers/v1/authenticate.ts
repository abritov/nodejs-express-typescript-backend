import { Express } from 'express';
import { PassportStatic } from 'passport';
import { Strategy as VkStrategy, VerifyFunction } from 'passport-vkontakte';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import jwtToken from 'jsonwebtoken';
import {
  StrategyOptions as JwtStrategyOptions,
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback as JwtVerifiedCallback
} from 'passport-jwt';
import { User } from '../../db/models/User';
import { DbApi } from '../../db/index';
import { Hasher } from '../../utils/hasher';
import { UserController } from './user.controller';
import { EmailIsNotSpecified } from './error';

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

export function initializePassport(db: DbApi, app: Express, passport: PassportStatic) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    db.User.findById(id).then((user) => {
      done(null, user!);
    });
  });
}

export function createJwtStrategy(db: DbApi, jwt: Jwt) {
  return new JwtStrategy(jwt.toJwtStrategyOptions(), async (payload: JwtPayload, done: JwtVerifiedCallback) => {
    const user = await db.User.findById(payload.userId);
    if (user) {
      return done(null, payload);
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
        if (!hasher.validate(hasher.prepareCredentials(email, password), user.passwordHash!))
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

export function createFacebookStrategy(userController: UserController, clientID: string, clientSecret: string, callbackURL: string, profileFields?: string[]) {
  return new FacebookStrategy({
    clientID,
    clientSecret,
    callbackURL,
    profileFields: profileFields || ['id', 'displayName', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    try {
      const user = await userController.create({
        name: profile.displayName,
        email: profile.emails![0].value!,
        password: userController.makeSocialPassword(accessToken)
      });
      const signup = await userController.createSignupRecord(user, 'fb', profile, true);
      done(null, user);
    }
    catch (error) {
      done(error, null);
    }
  });
}