const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../utils/auth.js')
const { Channel, Message, User } = require('../db/models')

router.use(requireAuth)

router.get('/:channelId', asyncHandler(async (req, res) => {
  // const { user } = req
  // if (!user) return res.json({})
  const { channelId } = req.params
  const channel = await Channel.findByPk(channelId, {
    include: [{ model: Message }, { model: User }]
  })

  if (channel) return res.json(channel.toJSON())
  else return res.json({})
}))

router.post('/:channelId/message', asyncHandler(async (req, res) => {
  const { user } = req
  const { content } = req.body
  const { channelId } = req.params
  console.log('🔥🔥🔥')
  const message = await Message.create({ user_id: user.id, content, channel_id: channelId })
  return res.json({ message })
}))

module.exports = router
