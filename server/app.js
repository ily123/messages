const express = require('express')
const config = require('./config')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const router = require('./router')

// create app object
const app = express()

// apply middle ware
app.use(cookieParser())
app.use(express.json())

const isProduction = config.environment === 'production'
if (!isProduction) app.use(cors())
app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    httpOnly: true
  }
}))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('tiny'))

// register routes
app.use('/api', router)

// add handler for requests to non-existent end points
app.use((_req, _res, next) => {
  const error = new Error('Requested resource could not be found.')
  error.title = 'Resource Not Found'
  error.errors = ['Error 404']
  error.status = 404
  next(error)
})
module.exports = app
