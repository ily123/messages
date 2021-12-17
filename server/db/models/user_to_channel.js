'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserToChannel = sequelize.define('UserToChannel', {
    channel_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    tableName: 'user_to_channel'
  })
  UserToChannel.associate = function (models) {
    // associations can be defined here
  }
  return UserToChannel
}
