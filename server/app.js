const express = require('express')
const config = require('./config')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const router = require('./router')
const { ValidationError } = require('sequelize')
const WebSocket = require('ws')
const { createServer } = require('http')

// create app object
const app = express()
const server = createServer(app)
const wss = new WebSocket.Server({ server })

app.wss = wss

wss.on('connection', (ws) => {
  ws.on('message', (jsonData) => {
    console.log(`message -> socket -> ${jsonData}`)
    const { chatId } = JSON.parse(jsonData)
    ws.chatId = chatId

    // wss.clients.forEach(client => {
    //  if (client.readyState === WebSocket.OPEN) {
    //    client.send(JSON.stringify({ type: 'test', msg: 'main app body -> this is a socket test' }))
    //  }
    // })
  })
  ws.on('close', (e) => {
    console.log('close -> socket ->', e)
  })
})

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
app.use(router)

// add handler for requests to non-existent end points
app.use((_req, _res, next) => {
  const error = new Error('Requested resource could not be found.')
  error.title = 'Resource Not Found'
  error.errors = ['Error 404'] // why is this an array
  error.status = 404
  next(error)
})

// add handler for failed Sequelize operations
app.use((error, _req, _res, next) => {
  if (error instanceof ValidationError) {
    error.title = 'Database Error'
    error.errors = ['Database Error']
  }
  next(error)
})

// format all existing errors, if any, and return to client
app.use((error, _req, res, _next) => {
  console.log('😧' + error.title)
  console.log(error)
  res.status(error.status || 500)
  res.send({
    title: error.title || 'Server error',
    message: error.message,
    errors: error.errors,
    stack: isProduction ? null : error.stack
  })
})

module.exports = server
