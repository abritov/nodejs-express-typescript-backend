import * as assert from "assert";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { Request, Response, Router } from "express";
import HttpStatus from "http-status";
import { PassportStatic } from "passport";
import { UniqueConstraintError } from "sequelize";
import { CryptoConfig } from "../../config/types";
import { DbApi } from "../../db";
import { FacebookSignupResult } from "./authenticate";
import { CreateSignup, SignupToken } from "./schema";

const SIGNUP_CIPHER_ALGORITHM = "aes-256-cbc";
const IV_LEN = 16;
const DELIMITER = ";";

export class SignupEncDec {
  public _secret: string;
  public _algorigthm: string;
  public _ivlen: number;
  public _delimiter: string;

  constructor(config: CryptoConfig) {
    this._secret = config.secret;
    this._algorigthm = config.algorithm;
    this._ivlen = config.ivLength;
    this._delimiter = config.delimiter;
    assert.equal(this._secret.length, 32, "SignupEncDec wrong secret length, must be 32 got " + this._secret.length);
  }

  public encode(req: SignupToken) {
    const iv = randomBytes(this._ivlen);
    const aes = createCipheriv(this._algorigthm, this._secret, iv);
    let encoded = aes.update(JSON.stringify(req));
    encoded = Buffer.concat([encoded, aes.final()]);
    return iv.toString("hex") + this._delimiter + encoded.toString("hex");
  }

  public decode(req: string): SignupToken {
    const parts = req.split(this._delimiter);
    if (!parts) {
      throw Error("invalid request");
    }
    const iv = Buffer.from(parts.shift()!, "hex");
    const encryptedRequest = Buffer.from(parts.join(this._delimiter), "hex");
    const aes = createDecipheriv(this._algorigthm, this._secret, iv);
    let decoded = aes.update(encryptedRequest);
    decoded = Buffer.concat([decoded, aes.final()]);
    return JSON.parse(decoded.toString());
  }
}

export class SignupController {
  constructor(public readonly _db: DbApi, public readonly _cipher: SignupEncDec) { }

  public encodeRequest(req: SignupToken) {
    return this._cipher.encode(req);
  }

  public decodeRequest(req: string): SignupToken {
    return this._cipher.decode(req);
  }

  public async create(request: CreateSignup, provider: string, active: boolean) {
    return this._db.Signup.create({
      active,
      provider,
      email: request.email,
      password: request.password,
      payload: request.payload,
      socialId: request.socialId,
      accessToken: request.accessToken,
    });
  }
}

export function createSignupRouter(controller: SignupController, passport: PassportStatic) {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const request: CreateSignup = req.body;
      const signup = await controller.create(request, "email", false);
      const encodedSignup = controller.encodeRequest({
        id: signup!.id!,
        name: request.name,
        email: signup!.email,
        password: signup!.password,
      });
      res.status(HttpStatus.OK).send({ encodedSignup });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: "record already exists" });
      } else {
        console.error(error.message);
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    }
  });

  router.get("/fb", passport.authenticate("facebook", { session: false }), async (req: Request, res: Response) => {
    // we do not get here
  });

  router.get("/fb/callback", passport.authenticate("facebook", { session: false }), async (req: Request, res: Response) => {
    const result: FacebookSignupResult = req.user;
    console.error(result.error);
    if (result.error) {
      if (result.error instanceof UniqueConstraintError) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ error: "this account is already in use" });
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }
    const encodedSignup = controller.encodeRequest({
      id: result.signup!.id!,
      name: result.signup!.name,
      email: result.signup!.email,
      password: result.signup!.password,
      socialId: result.signup!.socialId,
    });
    console.log(encodedSignup);
    res.status(HttpStatus.OK).send({ encodedSignup });
  });

  router.post("/decode", (req: Request, res: Response) => {
    res.send(controller.decodeRequest(req.body.signup));
  });

  return router;
}
