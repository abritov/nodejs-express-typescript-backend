export interface ISignupTempRecord {
  name: string;
  profile: any;
  provider: string;
}

export interface ISignupTemp {
  get(accessToken: string): ISignupTempRecord | undefined;
  set(accessToken: string, value: ISignupTempRecord): void;
  has(accessToken: string): boolean;
}

export class SignupTempMemory implements ISignupTemp {
  public store: Map<string, ISignupTempRecord> = new Map<
    string,
    ISignupTempRecord
  >();

  public has(accessToken: string): boolean {
    return this.store.has(accessToken);
  }

  public get(accessToken: string): ISignupTempRecord | undefined {
    return this.store.get(accessToken);
  }

  public set(accessToken: string, value: ISignupTempRecord): void {
    this.store.set(accessToken, value);
  }
}
