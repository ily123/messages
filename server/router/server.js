const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../utils/auth.js')
const { Channel, Server, User, UserToServer } = require('../db/models')

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
  console.log(req.user)
  // create new server with user as owner
  const server = await Server.create({ owner_id: user.id, title })
  // add owner as member
  await UserToServer.create({ user_id: user.id, server_id: server.id })
  // add default starting channel to server
  await Channel.create({ server_id: server.id })
  return res.json({ server })
}))

module.exports = router
