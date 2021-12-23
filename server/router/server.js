const router = require('express').Router()
const asyncHandler = require('express-async-handler')
// const { restoreUser } = require('../utils/auth.js')
const { Channel, Server } = require('../db/models')

router.get('/:serverId', asyncHandler(async (req, res) => {
  // const { user } = req
  // if (!user) return res.json({})
  const { serverId } = req.params
  const server = await Server.findByPk(serverId, {
    include: { model: Channel }
  })

  if (server) return res.json(server.toJSON())
  else return res.json({})
}))

module.exports = router
