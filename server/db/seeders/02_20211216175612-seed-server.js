'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('server', [
      { owner_id: 1, title: 'Test Server 1' },
      { owner_id: 2, title: 'Test Server 2' }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('server', null, {})
  }
}
