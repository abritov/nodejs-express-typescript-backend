export interface IHash {
  createHash(data: string, salt?: string): string;
  validate(data: string, hash: string, salt?: string): boolean;
  prepareCredentials(login: string, password: string): string;
}
