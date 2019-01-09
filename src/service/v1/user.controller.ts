import { Request, Router } from "express";
import HttpStatus from "http-status";
import { PassportStatic } from "passport";
import { UniqueConstraintError } from "sequelize";
import { IDbApi } from "../../db";
import { ISignupTemp, ISignupTempRecord } from "../../temp/signup";
import { IHash, logger } from "../../utils";
import { CreateUser } from "./schema";
import { SignupController } from "./signup.controller";

export class UserController {
  constructor(
    private readonly db: IDbApi,
    private readonly hasher: IHash,
    private readonly signup: ISignupTemp
  ) {}

  public signupReserve(accessToken: string, signup: ISignupTempRecord) {
    this.signup.set(accessToken, signup);
  }

  public makeSocialPassword(socialId: string) {
    const password = `${socialId.toUpperCase()}${socialId.length}`;
    return this.hasher.createHash(password);
  }

  public async create(
    request: CreateUser,
    signupId: number,
    approved: boolean
  ) {
    const passwordHash = this.hasher.createHash(
      this.hasher.prepareCredentials(request.email!, request.password!)
    );
    const user = await this.db.User.create({
      approved,
      email: request.email!,
      name: request.name,
      passwordHash,
      signupId
    });
    return user;
  }
}

export function createUserRouter(
  controller: UserController,
  signupController: SignupController,
  passport: PassportStatic
) {
  const router = Router();

  router.post("/", async (req: Request, res) => {
    let isSocial = false;
    try {
      const request: CreateUser = req.body;
      logger.log(request.encodedSignup);
      const signup = signupController.decodeRequest(request.encodedSignup);
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
      logger.log(request);
      const user = await controller.create(request, signup.id, isSocial);
      res.status(HttpStatus.OK).send(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: "user already exists" });
      } else {
        logger.error(error.message);
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  });

  return router;
}
