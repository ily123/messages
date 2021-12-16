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

testUser()
testServer()
testEagerLoadingOfOwnedServersWithUser()
