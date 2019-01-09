import { IHash } from "./hash";

export class MockHash implements IHash {
  constructor(public salt?: string) {}
  public prepareCredentials(login: string, password: string): string {
    return login + "." + password;
  }
  public createHash(data: string, salt?: string | undefined): string {
    return data + "." + this.salt || salt || "mock_salt";
  }
  public validate(
    data: string,
    hash: string,
    salt?: string | undefined
  ): boolean {
    return (data + "." + this.salt || salt || "mock_salt") === hash;
  }
}
