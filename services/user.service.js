const faker = require('faker')
const boom = require('@hapi/boom')

const getConnection = require('../libs/postgres')

class UsersService {
  constructor() {
    /* this.users = []
    this.generate() */
  }

  /* generate() {
    const limit = 100
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        isPrivate: faker.datatype.boolean()
      })
    }
  } */

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  async find() {
    const client = await getConnection()
    const response = await client.query('SELECT * FROM tasks')
    return response
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id)
    if (!user) {
      throw boom.notFound('User not found')
    }

    if(user.isPrivate) {
      throw boom.conflict('User is private')
    }
    return user
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('User not found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('User not found')
    }
    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = UsersService
