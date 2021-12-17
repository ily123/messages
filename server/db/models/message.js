'use strict'
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    channel_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING(2000)
  }, {
    tableName: 'message'
  })
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: 'user_id' })
    Message.belongsTo(models.Channel, { foreignKey: 'channel_id' })
  }
  return Message
}
