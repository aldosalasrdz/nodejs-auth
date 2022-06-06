/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { User } = require('../db/models/user.model')

const { models } = require('./../libs/sequelize')

class CustomerService {
  constructor () {}

  async createCustomer (data) {
    const hash = await bcrypt.hash(data.user.password, 10)
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    })
    delete newCustomer.user.dataValues.password
    return newCustomer
  }

  async findCustomers () {
    const customers = await models.Customer.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'recoveryToken']
        }
      }]
    })
    return customers
  }

  async findOneCustomer (id) {
    const customer = await models.Customer.findByPk(id)
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer
  }

  async updateCustomer (id, changes) {
    const customer = await this.findOneCustomer(id)
    const response = await customer.update(changes)
    return response
  }

  async deleteCustomer (id) {
    const customer = await this.findOneCustomer(id)
    await customer.destroy()
    return { id }
  }
}

module.exports = CustomerService
