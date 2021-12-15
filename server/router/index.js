const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  const msg = 'hello, this is a stub'
  res.json({ msg })
})

module.exports = router
