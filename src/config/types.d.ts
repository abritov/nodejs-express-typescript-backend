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
export interface EnvironmentConfig {
  db: DbConfig
  jwtSecret: string
}
export interface Config {
  development: EnvironmentConfig
  production: EnvironmentConfig
}