const db_config = require('../config/database')
const config = require('../config')
console.log(config)
console.log(db_config)

describe('This is a dummy test', function () {
  test('test 1', () => {
    expect(1).toEqual(1)
  })
  test('test 2', () => {
    expect(1).toEqual(1)
  })
})
