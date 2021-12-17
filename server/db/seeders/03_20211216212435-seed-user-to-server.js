'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_to_server', [
      { user_id: 1, server_id: 1 },
      { user_id: 1, server_id: 2 },
      { user_id: 2, server_id: 1 },
      { user_id: 2, server_id: 2 }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_to_server', null, {})
  }
}
