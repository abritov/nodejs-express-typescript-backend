import { Request, Response, Router } from "express";
import HttpStatus from "http-status";
import { PassportStatic } from "passport";
import { DbApi } from "../../db";
import { Hasher } from "../../utils/hasher";
import { Jwt, JwtPayload } from "./authenticate";
import { ENTITY_SIGNUP, ENTITY_USER, RecordNotFound, TokenRequestAccepted } from "./error";
import { AuthorizationToken, CreateToken } from "./schema";
import { SignupEncDec } from "./signup.controller";

export class TokenController {
  constructor(public readonly _db: DbApi, public readonly _hasher: Hasher, public readonly _jwt: Jwt) { }

  public async create(signupId: number, _accessBitmask?: number) {
    const accessBitmask = _accessBitmask || 1;
    if (accessBitmask < 1) {
      throw Error("invalid accessBitmask value");
    }
    if (accessBitmask > 1) {
      throw new TokenRequestAccepted();
    }

    const user = await this._db.User.findOne({
      where: {
        signupId,
      },
    });
    if (!user) { throw new RecordNotFound(ENTITY_USER); }

    const token = this._jwt.encrypt({
      userId: user.id,
      name: user.name,
      accessBitmask,
    } as JwtPayload);

    const signup = await this._db.Signup.findById(signupId);
    if (!signup) { throw new RecordNotFound(ENTITY_SIGNUP); }

    signup.jwtToken = token;
    signup.save();

    return token;
  }

  public async get(signupId: number) {
    const signup = await this._db.Signup.findById(signupId);
    if (!signup) { throw new RecordNotFound(ENTITY_SIGNUP); }
    return signup.jwtToken;
  }
}

export function createTokenRouter(controller: TokenController, signupCipher: SignupEncDec, passport: PassportStatic) {
  const router = Router();

  router.post("/insecure", async (req: Request, res: Response) => {
    if (!(req.ip == "127.0.0.1" || req.ip == "::1")) {
      res.status(HttpStatus.FORBIDDEN).send();
      return;
    }
    try {
      const user = await controller._db.User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "user not found" });
        return;
      }
      res.json(controller.create(user.id!, req.body.accessBitmask));
    } catch (error) {
      if (error instanceof TokenRequestAccepted) {
        res.status(HttpStatus.ACCEPTED).json({ message: "please wait until your token will be approved" });
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const request: CreateToken = req.body;
      const signup = signupCipher.decode(request.encodedSignup);
      const token = await controller.create(signup.id, request.accessBitmask);
      res.json({ token });
    } catch (error) {
      if (error instanceof TokenRequestAccepted) {
        res.status(HttpStatus.ACCEPTED).json({ message: "please wait until your token will be approved" });
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message || error.stack[0] });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const signup = signupCipher.decode(req.query.encodedSignup);
      const token = await controller.get(signup.id);
      res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      console.error(error);
      if (error instanceof TypeError) {
        res.status(HttpStatus.BAD_REQUEST).send();
        return;
      }
      if (error instanceof RecordNotFound) {
        res.status(HttpStatus.NOT_FOUND).send();
        return;
      }
    }
  });

  return router;
}
