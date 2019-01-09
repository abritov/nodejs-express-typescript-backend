import { IHash } from "./hash";

export class BcryptHash implements IHash {
  public prepareCredentials(login: string, password: string): string {
    return login + "." + password;
  }
  public createHash(data: string, salt?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  public validate(
    data: string,
    hash: string,
    salt?: string | undefined
  ): boolean {
    throw new Error("Method not implemented.");
  }
}
