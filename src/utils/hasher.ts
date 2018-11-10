export interface Hasher {
  createHash(data: string, salt?: string): string
  validate(data: string, hash: string, salt?: string): boolean
}

export class MockHasher implements Hasher {
  constructor(public salt?: string) { }
  createHash(data: string, salt?: string | undefined): string {
    return data + "." + this.salt || salt || "mock_salt";
  }
  validate(data: string, hash: string, salt?: string | undefined): boolean {
    return (data + "." + this.salt || salt || "mock_salt") == hash;
  }
}

export class BcryptHasher implements Hasher {
  createHash(data: string, salt?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  validate(data: string, hash: string, salt?: string | undefined): boolean {
    throw new Error("Method not implemented.");
  }
}