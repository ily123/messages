'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('message', [
      { user_id: 1, channel_id: 1, content: 'hello this is a test comment' },
      { user_id: 2, channel_id: 1, content: 'hello this is also a test comment' }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('message', null, {})
  }
}
