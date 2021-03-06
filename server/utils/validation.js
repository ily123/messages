const { validationResult } = require('express-validator')

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) return next()

  const errors = validationErrors
    .array()
    .map((error) => `${error.msg}`)

  const err = Error('Missing or innaccurate data sent with the request.')
  err.errors = errors
  err.status = 400
  err.title = 'Missing or innaccurate data sent with the request.'
  next(err)
}

module.exports = {
  handleValidationErrors
}
