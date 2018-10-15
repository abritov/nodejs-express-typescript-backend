export interface User {
  id?: number,
  name: string,
  authKey: string,
  passwordHash: string,
  passwordResetToken: string,
  email: string,
  status: number,
}
