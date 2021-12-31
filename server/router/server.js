const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../utils/auth.js')
const { Channel, Server, User, UserToServer, UserToChannel } = require('../db/models')

router.use(requireAuth)

function normalize (dataArray) {
  const dataObj = {}
  dataArray.forEach(item => {
    dataObj[item.id] = item
  })
  return dataObj
}

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req
  const { member: servers } = await User.findByPk(user.id, {
    include: {
      model: Server,
      as: 'member',
      include: {
        model: Channel
      }
    }
  })
  return res.json(normalize(servers))
}))

router.get('/:serverId', asyncHandler(async (req, res) => {
  const { user } = req
  const { serverId } = req.params
  const server = await Server.findByPk(serverId, {
    include: { model: Channel }
  })

  if (server) return res.json(server.toJSON())
  else return res.json({})
}))

router.post('/', asyncHandler(async (req, res) => {
  const { title } = req.body
  const { user } = req
  // create new server with user as owner
  const server = await Server.create({ owner_id: user.id, title })
  // add owner as member
  await UserToServer.create({ user_id: user.id, server_id: server.id })
  // add default starting channel to server
  const channel = await Channel.create({ server_id: server.id })
  // add user to the channel
  await UserToChannel.create({ channel_id: channel.id, user_id: user.id })
  return res.json({ server })
}))

router.delete('/:serverId', asyncHandler(async (req, res) => {
  console.log('❤️ DELETE REQUEST')
  const { user } = req
  const { serverId } = req.params
  const server = await Server.findByPk(serverId, { include: { model: Channel } })
  console.log(server.toJSON())
  const serverChannels = server.Channels.map(ch => ch.id)
  // Delete records from the join user-to-XYZ tables.
  // Couldn't figure out the cascades for this.
  await UserToServer.destroy({ where: { server_id: serverId } })
  await UserToChannel.destroy({ where: { channel_id: serverChannels } })
  console.log('🔥🔥🔥 user to server above ^')
  const success = await server.destroy()
  return res.json({ suceess: !!success })
}))

router.patch('/:serverId', asyncHandler(async (req, res) => {
  console.log('❤️ PATCH REQUEST')
  const { user } = req
  const { serverId } = req.params
  const { title } = req.body
  const server = await Server.findByPk(serverId, {
    include: { model: Channel }
  })
  server.title = title
  await server.save()
  return res.json({ server })
}))

router.put('/:serverId', asyncHandler(async (req, res) => {
  console.log('❤️ PUT REQUEST')
  const { user } = req
  const { serverId } = req.params
  const server = await Server.findByPk(serverId, {
    include: { model: Channel }
  })
  if (server) {
    await UserToServer.create({ user_id: user.id, server_id: server.id })
    return res.json({ server })
  }
  return res.json({})
}))

module.exports = router
