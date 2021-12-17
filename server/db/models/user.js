'use strict'
const bcrypt = require('bcryptjs')
const { Validator, Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail (value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    tableName: 'user',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Message, { foreignKey: 'user_id' })
    User.hasMany(models.Server, { as: 'owner', foreignKey: 'owner_id' })
    User.belongsToMany(
      models.Server,
      {
        as: 'member',
        foreignKey: 'user_id',
        through: models.UserToServer
      }
    )
    User.belongsToMany(
      models.Channel,
      {
        foreignKey: 'user_id',
        through: models.UserToChannel
      }
    )
  }

  User.prototype.toSafeObject = function () {
    const { id, username, email } = this
    return { id, username, email }
  }

  User.prototype.validatePassword = function (password) {
    const hashedPassword = this.hashedPassword.toString()
    return bcrypt.compareSync(password, hashedPassword)
  }

  User.login = async function ({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: { username: credential, email: credential }
      }
    })
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id)
    }
  }

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({ username, email, hashedPassword })
    return await User.scope('currentUser').findByPk(user.id)
  }

  return User
}
