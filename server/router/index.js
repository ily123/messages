const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
router.use('/auth', authRoutes)

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  return res.send('THIS IS A TEST, SET XSRF TOKEN')
})

module.exports = router
