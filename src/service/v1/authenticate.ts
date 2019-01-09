import { Express } from "express";
import jwtToken from "jsonwebtoken";
import { PassportStatic } from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions as JwtStrategyOptions,
  VerifiedCallback as JwtVerifiedCallback
} from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as VkStrategy, VerifyFunction } from "passport-vkontakte";
import { ISocialAuthProvider } from "../../config/types";
import { IDbApi } from "../../db/index";
import { User } from "../../db/models/User";
import { IHash, logger } from "../../utils";
import { CreateSignup, SignupToken } from "./schema";
import { SignupController } from "./signup.controller";
import { UserController } from "./user.controller";

export interface IJwtPayload {
  userId: number;
  name: string;
  accessBitmask: number;
}

export interface IFacebookSignupResult {
  error?: Error;
  signup?: SignupToken;
}

export class Jwt {
  constructor(public secret: string, public algorithm?: string) {
    this.algorithm = algorithm || "HS256";
  }

  public encrypt(data: IJwtPayload) {
    return jwtToken.sign(data, this.secret, { algorithm: this.algorithm });
  }

  public toJwtStrategyOptions(): JwtStrategyOptions {
    return {
      algorithms: [this.algorithm!],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret
    };
  }
}

export function initializePassport(
  db: IDbApi,
  app: Express,
  passport: PassportStatic
) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    db.User.findById(id).then(user => {
      done(null, user!);
    });
  });
}

export function createJwtStrategy(db: IDbApi, jwt: Jwt) {
  return new JwtStrategy(
    jwt.toJwtStrategyOptions(),
    async (payload: IJwtPayload, done: JwtVerifiedCallback) => {
      const user = await db.User.findById(payload.userId);
      if (user) {
        return done(null, payload);
      }
      return done("cannot find user", null);
    }
  );
}

export function createLocalStrategy(db: IDbApi, hasher: IHash) {
  return new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
          return done(null, false);
        }
        if (
          !hasher.validate(
            hasher.prepareCredentials(email, password),
            user.passwordHash!
          )
        ) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
}

export function createVkStrategy(
  db: IDbApi,
  clientID: string,
  clientSecret: string,
  callbackURL: string
) {
  return new VkStrategy(
    {
      callbackURL,
      clientID,
      clientSecret
    },
    (accessToken, refreshToken, params, profile, done) => {
      logger.log(accessToken, refreshToken, params, profile);
      done(null, profile);
    }
  );
}

export function createFacebookStrategy(
  signupController: SignupController,
  userController: UserController,
  config: ISocialAuthProvider,
  profileFields?: string[]
) {
  return new FacebookStrategy(
    {
      callbackURL: config.callbackURL,
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      profileFields: profileFields || ["id", "displayName", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      logger.log(accessToken, refreshToken, profile);
      try {
        let email: string | undefined;
        if (profile.emails) {
          email = profile.emails[0]!.value;
        }
        const createRequest: CreateSignup = {
          accessToken,
          email,
          name: profile.displayName,
          password: userController.makeSocialPassword(profile.id),
          payload: profile,
          socialId: profile.id
        };
        const signup = await signupController.create(createRequest, "fb", true);
        const result: IFacebookSignupResult = {
          signup: {
            id: signup.id!,
            ...createRequest
          }
        };
        done(null, result);
      } catch (error) {
        done(null, { error } as IFacebookSignupResult);
      }
    }
  );
}
