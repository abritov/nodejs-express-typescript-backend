const config = {
  development: {
    username: "root",
    password: "root",
    database: "ranobe_v2",
    host: "127.0.0.1",
    dialect: "mysql",
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
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
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
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
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
  }
}

config['development_int09h'] = {
  ...config.development,
  host: "arch",
  port: 3309,
  username: 'test',
  password: 'test',
}

module.exports = config;