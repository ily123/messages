const router = require('express').Router()
const asyncHandler = require('express-async-handler')
// const { restoreUser } = require('../utils/auth.js')
const { Channel, Message, User } = require('../db/models')

router.get('/:channelId', asyncHandler(async (req, res) => {
  // const { user } = req
  // if (!user) return res.json({})
  const { channelId } = req.params
  const channel = await Channel.findByPk(channelId, {
    include: [{ model: Message }, { model: User }]
  })
  return res.json(channel.toJSON())
}))

module.exports = router
