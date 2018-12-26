import HttpStatus from 'http-status';
import { PassportStatic } from 'passport';
import { UniqueConstraintError } from 'sequelize';
import { Router, Request } from 'express';
import { DbApi } from '../../db';
import { CreateUser } from './schema';
import { Hasher } from '../../utils/hasher';
import { SignupTemp, SignupTempRecord } from '../../temp/signup';
import { SignupController } from './signup.controller';

export class UserController {
  constructor(public readonly _db: DbApi, public readonly _hasher: Hasher, public readonly _signup: SignupTemp) { }

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

export function createUserRouter(controller: UserController, signupController: SignupController, passport: PassportStatic) {
  const router = Router();

  router.post('/', async (req: Request, res) => {
    let isSocial = false;
    try {
      let request: CreateUser = req.body;
      console.log(request.encodedSignup);
      let signup = signupController.decodeRequest(request.encodedSignup);
      if (!request.email) {
        isSocial = true;
        request.email = signup.email!;
      }
      if (!request.password) {
        isSocial = true;
        request.password = signup.password;
      }
      if (!request.name) {
        request.name = signup.name;
      }
      console.log(request);
      let user = await controller.create(request, signup.id, isSocial);
      res.status(HttpStatus.OK).send(user);
    }
    catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: "user already exists" });
      } else {
        console.error(error.message);
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  });

  return router;
}