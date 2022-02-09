const config = require('./index')

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    username: config.test_db.username,
    password: config.test_db.password,
    database: config.test_db.database,
    host: config.db.host,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  }
}
