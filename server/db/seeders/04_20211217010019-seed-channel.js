'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channel', [
      { server_id: 1, title: 'Channel 1' },
      { server_id: 1, title: 'Channel 2' },
      { server_id: 1, title: 'Channel 3' },
      { server_id: 2, title: 'Channel A' },
      { server_id: 2, title: 'Channel B' }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channel', null, {})
  }
}
