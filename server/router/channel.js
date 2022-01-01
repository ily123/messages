const router = require('express').Router()
const WebSocket = require('ws')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../utils/auth.js')
const { Channel, Message, User, Server } = require('../db/models')

router.use(requireAuth)

router.get('/:channelId', asyncHandler(async (req, res) => {
  // const { user } = req
  // if (!user) return res.json({})
  const { channelId } = req.params
  const channel = await Channel.findByPk(channelId, {
    include: [{ model: Message }]
  })

  const { server_id } = channel
  const server = await Server.findByPk(server_id, { include: { model: User, as: 'member' } })
  // trying to attach users to channel object
  const channelJson = channel.toJSON()
  channelJson.Users = server.member.map(member => member.toJSON())
  if (channelJson) return res.json(channelJson)
  else return res.json({})
}))

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req
  const { title, serverId } = req.body
  const channel = await Channel.create({ server_id: serverId, title })
  // req.app.wss.clients.forEach(client => {
  //  console.log('broadcasting to client with id of ❤️ ' + client.chatId)
  //  if (client.readyState === WebSocket.OPEN && client.chatId == channelId) {
  //    client.send(JSON.stringify({ type: 'test', message }))
  //  }
  // })
  return res.json({ channel })
}))

router.post('/:channelId/message', asyncHandler(async (req, res) => {
  const { user } = req
  const { content } = req.body
  const { channelId } = req.params
  const message = await Message.create({ user_id: user.id, content, channel_id: channelId })
  req.app.wss.clients.forEach(client => {
    console.log('broadcasting to client with id of ❤️ ' + client.chatId)
    if (client.readyState === WebSocket.OPEN && client.chatId == channelId) {
      client.send(JSON.stringify({ type: 'test', message, user }))
    }
  })
  return res.json({ message, user })
}))

module.exports = router
