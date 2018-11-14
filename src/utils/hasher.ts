export interface Hasher {
  createHash(data: string, salt?: string): string
  validate(data: string, hash: string, salt?: string): boolean
  prepareCredentials(login: string, password: string): string
}

export class MockHasher implements Hasher {
  prepareCredentials(login: string, password: string): string {
    return login + "." + password;
  }
  constructor(public salt?: string) { }
  createHash(data: string, salt?: string | undefined): string {
    return data + "." + this.salt || salt || "mock_salt";
  }
  validate(data: string, hash: string, salt?: string | undefined): boolean {
    return (data + "." + this.salt || salt || "mock_salt") == hash;
  }
}

export class BcryptHasher implements Hasher {
  prepareCredentials(login: string, password: string): string {
    return login + "." + password;
  }
  createHash(data: string, salt?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  validate(data: string, hash: string, salt?: string | undefined): boolean {
    throw new Error("Method not implemented.");
  }
}