import { Request, Response, Router } from "express";
import HttpStatus from "http-status";
import { PassportStatic } from "passport";
import { UniqueConstraintError } from "sequelize";
import { IDbApi } from "../../db";
import { logger } from "../../utils/logger";
import { IFacebookSignupResult } from "./authenticate";
import { CreateSignup, SignupToken } from "./schema";
import { SignupEncDec } from "./signup.encdec";

export class SignupController {
  constructor(
    private readonly db: IDbApi,
    private readonly cipher: SignupEncDec
  ) {}

  public encodeRequest(req: SignupToken) {
    return this.cipher.encode(req);
  }

  public decodeRequest(req: string): SignupToken {
    return this.cipher.decode(req);
  }

  public async create(
    request: CreateSignup,
    provider: string,
    active: boolean
  ) {
    return this.db.Signup.create({
      accessToken: request.accessToken,
      active,
      email: request.email,
      password: request.password,
      payload: request.payload,
      provider,
      socialId: request.socialId
    });
  }
}

export function createSignupRouter(
  controller: SignupController,
  passport: PassportStatic
) {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const request: CreateSignup = req.body;
      const signup = await controller.create(request, "email", false);
      const encodedSignup = controller.encodeRequest({
        email: signup!.email,
        id: signup!.id!,
        name: request.name,
        password: signup!.password
      });
      res.status(HttpStatus.OK).send({ encodedSignup });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: "record already exists" });
      } else {
        logger.error(error.message);
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  });

  router.get(
    "/fb",
    passport.authenticate("facebook", { session: false }),
    async (req: Request, res: Response) => {
      // we do not get here
    }
  );

  router.get(
    "/fb/callback",
    passport.authenticate("facebook", { session: false }),
    async (req: Request, res: Response) => {
      const result: IFacebookSignupResult = req.user;
      logger.error(result.error);
      if (result.error) {
        if (result.error instanceof UniqueConstraintError) {
          res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .send({ error: "this account is already in use" });
          return;
        }
        res.status(HttpStatus.BAD_REQUEST).send();
        return;
      }
      const encodedSignup = controller.encodeRequest({
        email: result.signup!.email,
        id: result.signup!.id!,
        name: result.signup!.name,
        password: result.signup!.password,
        socialId: result.signup!.socialId
      });
      logger.log(encodedSignup);
      res.status(HttpStatus.OK).send({ encodedSignup });
    }
  );

  router.post("/decode", (req: Request, res: Response) => {
    res.send(controller.decodeRequest(req.body.signup));
  });

  return router;
}
