import db from './db/config'

const config = {
  db,
  development: {
    jwtSecret: 'SCugV4e4Z6DTZzXmfYbHqh9KlblOSHVL8tpqy0gO3+W7ylryT',
  },
  production: {
    jwtSecret: process.env.JWT_SECRET
  }
}

export default config;