import * as assert from 'assert';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { UniqueConstraintError } from 'sequelize';
import { PassportStatic } from 'passport';
import { Router, Request, Response } from 'express';
import { DbApi } from '../../db';
import { CreateSignup, SignupToken } from './schema';
import { FacebookSignupResult } from './authenticate';
import { CryptoConfig } from '../../config/types';

const SIGNUP_CIPHER_ALGORITHM = 'aes-256-cbc';
const IV_LEN = 16;
const DELIMITER = ';';

export class SignupEncDec {
  _secret: string
  _algorigthm: string
  _ivlen: number
  _delimiter: string

  constructor(config: CryptoConfig) {
    this._secret = config.secret;
    this._algorigthm = config.algorithm;
    this._ivlen = config.ivLength;
    this._delimiter = config.delimiter;
    assert.equal(this._secret.length, 32, 'SignupEncDec wrong secret length, must be 32 got ' + this._secret.length);
  }

  encode(req: SignupToken) {
    let iv = randomBytes(this._ivlen);
    let aes = createCipheriv(this._algorigthm, this._secret, iv);
    let encoded = aes.update(JSON.stringify(req));
    encoded = Buffer.concat([encoded, aes.final()]);
    return iv.toString('hex') + this._delimiter + encoded.toString('hex');
  }

  decode(req: string): SignupToken {
    let parts = req.split(this._delimiter);
    if (!parts)
      throw Error('invalid request');
    let iv = Buffer.from(parts.shift()!, 'hex');
    let encryptedRequest = Buffer.from(parts.join(this._delimiter), 'hex');
    let aes = createDecipheriv(this._algorigthm, this._secret, iv);
    let decoded = aes.update(encryptedRequest);
    decoded = Buffer.concat([decoded, aes.final()]);
    return JSON.parse(decoded.toString());
  }
}

export class SignupController {
  constructor(public _db: DbApi, public _cipher: SignupEncDec) { }

  encodeRequest(req: SignupToken) {
    return this._cipher.encode(req);
  }

  decodeRequest(req: string): SignupToken {
    return this._cipher.decode(req);
  }

  async create(request: CreateSignup, provider: string, active: boolean) {
    return this._db.Signup.create({
      active,
      provider,
      email: request.email,
      password: request.password,
      payload: request.payload,
      socialId: request.socialId,
      accessToken: request.accessToken,
    })
  }
}

export function createSignupRouter(controller: SignupController, passport: PassportStatic) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      let request: CreateSignup = req.body;
      let signup = await controller.create(request, 'email', false);
      let encodedSignup = controller.encodeRequest({
        id: signup!.id!,
        name: request.name,
        email: signup!.email,
        password: signup!.password
      });
      res.status(200).send({ encodedSignup });
    }
    catch (error) {
      if (error instanceof UniqueConstraintError) {
        res.status(422).json({ error: "record already exists" });
      } else {
        console.error(error.message);
        res.status(400).send();
      }
    }
  });

  router.get('/fb', passport.authenticate('facebook', { session: false }), async (req: Request, res: Response) => {
    // we do not get here
  });

  router.get('/fb/callback', passport.authenticate('facebook', { session: false }), async (req: Request, res: Response) => {
    let result: FacebookSignupResult = req.user;
    console.error(result.error);
    if (result.error) {
      if (result.error instanceof UniqueConstraintError) {
        res.status(422).send({ error: "this account is already in use" });
        return;
      }
      res.status(400).send();
      return;
    }
    let encodedSignup = controller.encodeRequest({
      id: result.signup!.id!,
      name: result.signup!.name,
      email: result.signup!.email,
      password: result.signup!.password,
      socialId: result.signup!.socialId
    });
    console.log(encodedSignup);
    res.status(200).send({ encodedSignup });
  });

  router.post('/decode', (req: Request, res: Response) => {
    res.send(controller.decodeRequest(req.body.signup));
  });

  return router;
}