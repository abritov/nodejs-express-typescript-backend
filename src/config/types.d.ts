export interface DbConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  port: number
  operatorsAliases: boolean
  sync: {
    force: boolean
  },
  define: {
    underscored: boolean
    freezeTableName: boolean
    charset: string
    timestamps: boolean
  }
}
export interface SocialAuthProvider {
  clientID: string
  clientSecret: string
  callbackURL: string
}
export interface CryptoConfig {
  secret: string
  algorithm: string
  ivLength: number
  delimiter: string
}
export interface EnvironmentConfig {
  db: DbConfig
  jwtSecret: string
  facebook: SocialAuthProvider
  signupTokenCipher: CryptoConfig
}
export interface Config {
  development: EnvironmentConfig
  production: EnvironmentConfig
}