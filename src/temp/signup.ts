export interface SignupTempRecord {
  name: string
  profile: any
  provider: string
}

export interface SignupTemp {
  get(accessToken: string): SignupTempRecord | undefined
  set(accessToken: string, value: SignupTempRecord): void
  has(accessToken: string): boolean
}

export class SignupTempMemory implements SignupTemp {
  store: Map<string, SignupTempRecord> = new Map<string, SignupTempRecord>();

  has(accessToken: string): boolean {
    return this.store.has(accessToken);
  }

  get(accessToken: string): SignupTempRecord | undefined {
    return this.store.get(accessToken);
  }

  set(accessToken: string, value: SignupTempRecord): void {
    this.store.set(accessToken, value);
  }
}