const db = require('../db/models')
const { User } = db

describe('Test database exists', function () {
  test('Connects to test database', async () => {
    let connected = true
    try {
      await db.sequelize.authenticate()
    } catch (e) {
      connected = false
    }
    expect(connected).toBe(true)
  })
  test('test 2', () => {
    expect(1).toEqual(1)
  })
})

afterAll(async () => await db.sequelize.close())
