// @ts-check

/**
 * @param {import('./types').EnvironmentConfig} config
 */
const config = {
  db: {
    username: "",
    password: "",
    database: "ranobe_v2",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: 'utf8' },
    port: 3306,
    operatorsAliases: false,
    sync: {
      force: false
    },
    define: {
      underscored: false,
      freezeTableName: true,
      charset: "utf8",
      timestamps: false
    }
  },
  jwtSecret: 'SCugV4e4Z6DTZzXmfYbHqh9KlblOSHVL8tpqy0gO3+W7ylryT',
  facebook: {
    clientID: '',
    clientSecret: '',
    callbackURL: ''
  },
  signupTokenCipher: {
    secret: '00000000000000000000000000000000',
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    delimiter: ';'
  }
}

module.exports = config;