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
  }
  return Server
}
