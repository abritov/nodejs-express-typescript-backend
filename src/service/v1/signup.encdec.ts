import * as assert from "assert";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { ICryptoConfig } from "../../config/types";
import { SignupToken } from "./schema";

const SIGNUP_CIPHER_ALGORITHM = "aes-256-cbc";
const IV_LEN = 16;
const DELIMITER = ";";

export class SignupEncDec {
  private secret: string;
  private algorigthm: string;
  private ivlen: number;
  private delimiter: string;

  constructor(config: ICryptoConfig) {
    this.secret = config.secret;
    this.algorigthm = config.algorithm;
    this.ivlen = config.ivLength;
    this.delimiter = config.delimiter;
    assert.equal(
      this.secret.length,
      32,
      "SignupEncDec wrong secret length, must be 32 got " + this.secret.length
    );
  }

  public encode(req: SignupToken) {
    const iv = randomBytes(this.ivlen);
    const aes = createCipheriv(this.algorigthm, this.secret, iv);
    let encoded = aes.update(JSON.stringify(req));
    encoded = Buffer.concat([encoded, aes.final()]);
    return iv.toString("hex") + this.delimiter + encoded.toString("hex");
  }

  public decode(req: string): SignupToken {
    const parts = req.split(this.delimiter);
    if (!parts) {
      throw Error("invalid request");
    }
    const iv = Buffer.from(parts.shift()!, "hex");
    const encryptedRequest = Buffer.from(parts.join(this.delimiter), "hex");
    const aes = createDecipheriv(this.algorigthm, this.secret, iv);
    let decoded = aes.update(encryptedRequest);
    decoded = Buffer.concat([decoded, aes.final()]);
    return JSON.parse(decoded.toString());
  }
}
