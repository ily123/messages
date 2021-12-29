'use strict'
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        email: 'joe@aol.com',
        username: 'joseph',
        hashedPassword: bcrypt.hashSync('12345')
      },
      {
        email: faker.internet.email(),
        username: 'joseph2',
        hashedPassword: bcrypt.hashSync('12345')
      },
      {
        email: faker.internet.email(),
        username: 'joseph3',
        hashedPassword: bcrypt.hashSync('12345')
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('user', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
}
