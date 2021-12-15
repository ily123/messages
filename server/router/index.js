const express = require('express')
const router = express.Router()

const sessionRoutes = require('./session')
router.use('/auth', sessionRoutes)

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  return res.send('THIS IS A TEST, SET XSRF TOKEN')
})

module.exports = router
