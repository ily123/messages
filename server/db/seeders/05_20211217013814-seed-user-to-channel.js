'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_to_channel', [
      { channel_id: 1, user_id: 1 },
      { channel_id: 1, user_id: 2 },
      { channel_id: 2, user_id: 1 },
      { channel_id: 2, user_id: 2 },
      { channel_id: 3, user_id: 1 },
      { channel_id: 3, user_id: 2 },
      { channel_id: 4, user_id: 1 },
      { channel_id: 4, user_id: 2 }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_to_channel', null, {})
  }
}
