const express = require('express')
const config = require('./config')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

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

app.get('/api/', (req, res) => {
  const msg = 'hello, this is a stub'
  res.json({ msg })
})

app.listen(5000, () => console.log('server started'))
