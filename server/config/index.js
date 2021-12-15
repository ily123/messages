const result = require('dotenv').config()
if (result.error) {
  console.log('💔💔💔There is a problem with .env imports. See below.')
  throw result.error
}

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
  }
}
