'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserToServer = sequelize.define('UserToServer', {
    user_id: DataTypes.INTEGER,
    server_id: DataTypes.INTEGER
  }, {
    tableName: 'user_to_server'
  })
  UserToServer.associate = function (models) {
    // associations can be defined here
  }
  return UserToServer
}
