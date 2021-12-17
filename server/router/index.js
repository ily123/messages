const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')

router.use('/api/auth', authRoutes)

// This part is a bit tricky
// If the app is running in production do the following:
// - respond index.html file from the front-end build
//   - this file carries all the react script tags, etc
// - before sending file, attach XSRF cookie to it
//   - recall that csrf_ cookie is the secret , XSRF the actual token
// - also set routing for all static assets
// - also, send index + cookie to any route not starting with /api
//   - refactor this into a single route with the one above!!
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html')
    )
  })

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve('../client/build')))

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html')
    )
  })
}

// However, if we are running in development,
// we are not setting the XSRF cookie anywhere.
// We need front-end to have the cookie in order to pass the CSURF checks.
// So let's give front-end a route it can use to fetch the cookie.
//   (on the front-end we'll have a wrapper function that gets the cookie)
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return res.json({})
  })
}

module.exports = router
