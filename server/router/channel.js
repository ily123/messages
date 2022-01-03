const router = require('express').Router()
const WebSocket = require('ws')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../utils/auth.js')
const { Channel, Message, User, Server, UserToChannel } = require('../db/models')

router.use(requireAuth)

router.get('/:channelId', asyncHandler(async (req, res) => {
  const { channelId } = req.params
  // get channel data + messages
  const channel = await Channel.findByPk(channelId, {
    include: [{ model: Message }]
  })
  // fetch all users registered to channel's server
  const { server_id } = channel
  const server = await Server.findByPk(server_id, { include: { model: User, as: 'member' } })
  // attach users to channel object... the front-end expects it like this
  const channelJson = channel.toJSON()
  channelJson.Users = server.member.map(member => member.toJSON())
  if (channelJson) return res.json(channelJson)
  else return res.json({})
}))

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req
  const { title, serverId } = req.body
  const channel = await Channel.create({ server_id: serverId, title })
  return res.json({ channel })
}))

router.patch('/:channelId', asyncHandler(async (req, res) => {
  const { title } = req.body
  const { channelId } = req.params
  const channel = await Channel.findByPk(channelId)
  channel.title = title
  await channel.save()
  return res.json({ channel })
}))

router.delete('/:channelId', asyncHandler(async (req, res) => {
  const { channelId } = req.params
  const channel = await Channel.findByPk(channelId)
  await UserToChannel.destroy({ where: { channel_id: channelId } })
  const channelJson = channel.toJSON() // make a copy to send back
  await channel.destroy()
  return res.json({ channel: channelJson })
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

router.patch('/message/:messageId', asyncHandler(async (req, res) => {
  const { messageId } = req.params
  const { content } = req.body
  const message = await Message.findByPk(messageId)
  message.content = content
  message.save()
  return res.json({ message })
}))

router.delete('/message/:messageId', asyncHandler(async (req, res) => {
  const { messageId } = req.params
  const message = await Message.findByPk(messageId)
  await message.destroy()
  return res.json({ message })
}))

module.exports = router
