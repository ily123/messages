const { User, Server } = require('../db/models')
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

testUser()
testServer()
testEagerLoadingOfOwnedServersWithUser()
testEagerLoadingOfServersAsMemberUser()
testEagerLoadingOfMemberUsesOnServerModel()
