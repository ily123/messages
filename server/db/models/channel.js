'use strict'
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'New Channel'
    }
  }, {
    tableName: 'channel'
  })
  Channel.associate = function (models) {
    Channel.hasMany(models.Message, { foreignKey: 'channel_id' })
    Channel.belongsTo(models.Server, { foreignKey: 'server_id' })
    Channel.belongsToMany(
      models.User,
      {
        foreignKey: 'channel_id',
        through: models.UserToChannel
      }
    )
  }
  return Channel
}
