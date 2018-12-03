import { PassportStatic } from 'passport';
import { UniqueConstraintError } from 'sequelize';
import { Router, Request } from 'express';
import { DbApi } from '../../db';
import { CreateUser } from './schema';
import { Hasher } from '../../utils/hasher';
import { User } from '../../db/models/User';
import { SignupTemp, SignupTempRecord } from '../../temp/signup';

export class UserController {
  constructor(public _db: DbApi, public _hasher: Hasher, public _signup: SignupTemp) { }

  signupReserve(accessToken: string, signup: SignupTempRecord) {
    this._signup.set(accessToken, signup);
  }

  makeSocialPassword(socialId: string) {
    let password = `${socialId.toUpperCase()}${socialId.length}`;
    return this._hasher.createHash(password);
  }

  async create(request: CreateUser, signupId: number, approved: boolean) {
    const passwordHash = this._hasher.createHash(this._hasher.prepareCredentials(request.email!, request.password!));
    const user = await this._db.User.create({
      name: request.name,
      email: request.email!,
      passwordHash,
      signupId,
      approved
    });
    return user;
  }
}

export function createUserRouter(controller: UserController, passport: PassportStatic) {
  const router = Router();

  router.post('/', async (req: Request, res) => {
    try {
      res.json(await controller.create(<CreateUser>req.body));
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(422).json({ error: "user already exists" });
      }
    }
  });

  router.post('/signin', passport.authenticate('local'), async (req: Request, res) => {
    res.json({ token: 'supersecrettoken' });
  });

  return router;
}