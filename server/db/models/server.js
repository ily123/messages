'use strict'
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // table name in db
        key: 'id' // column name in db
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Your New Server'
    }
  }, {
    tableName: 'server'
  })
  Server.associate = function (models) {
    Server.belongsTo(models.User, { as: 'owner', foreignKey: 'owner_id' })
    Server.belongsToMany(
      models.User,
      {
        as: 'member',
        foreignKey: 'server_id',
        through: models.UserToServer
      }
    )
    Server.hasMany(models.Channel, { foreignKey: 'server_id' })
  }

  return Server
}
