const { User, Server, Channel, Message } = require('../db/models')
console.log(User)

// fetch all users and print their names
const testUser = async () => {
  const users = await User.findAll()
  console.log(users.map(user => user.username))
}

// fetch all servers and print their info
const testServer = async () => {
  const servers = await Server.findAll()
  console.log(servers.map(server => server.title))
}

// fetch user with their owned servers included
const testEagerLoadingOfOwnedServersWithUser = async () => {
  const user = await User.findOne({
    where: { id: 1 },
    include: {
      model: Server,
      as: 'owner'
    }
  })
  console.log(user.toJSON())
  const servers = user.owner
  console.log(user.id, user.username)
  console.log(servers.map(server => `${server.title} with owner ${server.owner_id}`))
}

const testEagerLoadingOfServersAsMemberUser = async () => {
  const user = await User.findOne({
    where: { id: 2 },
    include: {
      model: Server,
      as: 'member'
    }
  })
  console.log('-----🔥🔥🔥member🔥🔥🔥-----')
  console.log(user.toJSON())
  const servers = user.member
  console.log(user.id, user.username)
  console.log(servers.map(server => `${server.title} with owner ${server.owner_id}`))
}

const testEagerLoadingOfMemberUsesOnServerModel = async () => {
  const server = await Server.findOne({
    where: { id: 1 },
    include: {
      model: User,
      as: 'member'
    }
  })
  console.log('-----🔥server -> members🔥-----')
  console.log(server.toJSON())
  const members = server.member
  console.log(members.map(member => `${member.id} with owner ${member.username}`))
}
const testChannelModel = async () => {
  const channel = await Channel.findOne({
    where: { id: 1 },
    include: {
      model: Server
    }
  })
  console.log('-----🔥channel -> server 🔥-----')
  console.log(channel.toJSON())

  const server = await Server.findOne({
    where: { id: 1 },
    include: {
      model: Channel
    }
  })
  console.log('-----🔥server -> channel🔥-----')
  console.log(server.toJSON())

  const user = await User.findOne({
    where: { id: 1 },
    include: {
      model: Channel
    }
  })
  console.log('-----🔥user -> channel🔥-----')
  console.log(user.toJSON())

  let channel_ = await Channel.findOne({
    where: { id: 1 },
    include: {
      model: User
    }
  })
  console.log('-----🔥channel -> user🔥-----')
  console.log(channel_.toJSON())

  channel_ = await Channel.findOne({
    include: [{
      model: User
    }, {
      model: Server,
      where: { id: 2 }
    }]
  })
  console.log('-----🔥channel -> server (2) -> user🔥-----')
  console.log(channel_.toJSON())
}

const testMessage = async () => {
  const msg = await Message.findAll({ where: { channel_id: 1 } })
  console.log('-----🔥message🔥-----')
  console.log(msg.map(m => m.toJSON()))
}

testUser()
testServer()
testEagerLoadingOfOwnedServersWithUser()
testEagerLoadingOfServersAsMemberUser()
testEagerLoadingOfMemberUsesOnServerModel()
testChannelModel()
testMessage()
