import * as assert from 'assert';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { UniqueConstraintError } from 'sequelize';
import { PassportStatic } from 'passport';
import { Router, Request, Response } from 'express';
import { DbApi } from '../../db';
import { CreateSignup } from './schema';
import { FacebookSignupResult } from './authenticate';

const SIGNUP_CIPHER_ALGORITHM = 'aes-256-cbc';
const IV_LEN = 16;
const DELIMITER = ';';

interface SignupToken {
  id: number
  socialId?: string
  email?: string
}

export class SignupEncDec {
  constructor(public _secret: string,
    public _algorigthm: string = SIGNUP_CIPHER_ALGORITHM,
    public _ivlen: number = IV_LEN,
    public _delimiter: string = DELIMITER) {
    assert.equal(_secret, 32, 'SignupEncDec wrong secret length (must be 32)');
  }

  encodeRequest(req: SignupToken) {
    let iv = randomBytes(this._ivlen);
    let aes = createCipheriv(this._algorigthm, this._secret, iv);
    let encoded = aes.update(JSON.stringify(req));
    encoded = Buffer.concat([encoded, aes.final()]);
    return iv.toString('hex') + this._delimiter + encoded.toString('hex');
  }

  decodeRequest(req: string): SignupToken {
    let parts = req.split(this._delimiter);
    if (!parts)
      throw Error('invalid request');
    let iv = Buffer.from(parts.shift()!, 'hex');
    let encryptedRequest = Buffer.from(parts.join(this._delimiter), 'hex');
    let aes = createDecipheriv(this._algorigthm, this._secret, iv);
    let decoded = aes.update(encryptedRequest);
    decoded = Buffer.concat([decoded, aes.final()]);
    console.log(decoded);
    return JSON.parse(decoded.toString());
  }
}

export class SignupController {
  constructor(public _db: DbApi, public _cipher: SignupEncDec) { }

  encodeRequest(req: SignupToken) {
    return this._cipher.encodeRequest(req);
  }

  decodeRequest(req: string): SignupToken {
    return this._cipher.decodeRequest(req);
  }

  async create(request: CreateSignup, provider: string, active: boolean) {
    return this._db.Signup.create({
      active,
      provider,
      email: request.email,
      payload: request.payload,
      socialId: request.socialId,
      accessToken: request.accessToken,
    })
  }
}

export function createSignupRouter(controller: SignupController, passport: PassportStatic) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const signup = await controller.create(req.body, 'email', false);
    res.send(signup);
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
      email: result.signup!.email,
      socialId: result.signup!.socialId
    });
    console.log(encodedSignup);
    res.status(200).send({ signup: encodedSignup });
  });

  router.post('/decode', (req: Request, res: Response) => {
    res.send(controller.decodeRequest(req.body.signup));
  });

  return router;
}