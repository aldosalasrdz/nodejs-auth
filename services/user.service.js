/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../libs/sequelize')

class UserService {
  constructor () {}

  async createUser (data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    delete newUser.dataValues.password
    return newUser
  }

  async findUsers () {
    const users = await models.User.findAll({
      attributes: {
        exclude: ['password']
      },
      include: ['customer']
    })
    return users
  }

  async findUserByEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })
    return user
  }

  async findOneUser (id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async updateUser (id, changes) {
    const user = await this.findOneUser(id)
    const response = await user.update(changes)
    return response
  }

  async deleteUser (id) {
    const user = await this.findOneUser(id)
    await user.destroy()
    return { id }
  }
}

module.exports = UserService
