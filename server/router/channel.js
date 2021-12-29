const router = require('express').Router()
const WebSocket = require('ws')
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
  const message = await Message.create({ user_id: user.id, content, channel_id: channelId })
  req.app.wss.clients.forEach(client => {
    console.log('broadcasting to client with id of ❤️ ' + client.chatId)
    if (client.readyState === WebSocket.OPEN && client.chatId == channelId) {
      client.send(JSON.stringify({ type: 'test', message }))
    }
  })
  return res.json({ message })
}))

module.exports = router
