const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../../services/user.service')
const service = new UserService()

const LocalStrategy = new Strategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    const user = await service.findUserByEmail(email)
    if (!user) {
      done(boom.unauthorized(), false)
    }
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      done(boom.unauthorized(), false)
    }
    delete user.dataValues.password
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy
