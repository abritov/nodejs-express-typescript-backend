export interface IDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  port: number;
  operatorsAliases: boolean;
  sync: {
    force: boolean;
  };
  define: {
    underscored: boolean;
    freezeTableName: boolean;
    charset: string;
    timestamps: boolean;
  };
}
export interface ISocialAuthProvider {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}
export interface ICryptoConfig {
  secret: string;
  algorithm: string;
  ivLength: number;
  delimiter: string;
}
export interface IEnvironmentConfig {
  db: IDbConfig;
  jwtSecret: string;
  facebook: ISocialAuthProvider;
  signupTokenCipher: ICryptoConfig;
}
export interface IConfig {
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}
