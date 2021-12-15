const express = require('express')
const router = express.Router()

const sessionRoutes = require('./session')
router.use('/auth', sessionRoutes)

router.get('/', (req, res) => {
  return res.json('this is a test')
})

module.exports = router
