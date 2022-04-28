const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class CustomerService {
  constructor() {}

  async createCustomer(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    })
    return newCustomer
  }

  async findCustomer() {
    const customers = await models.Customer.findAll({
      include: ['user']
    })
    return customers
  }

  async findOneCustomer(id) {
    const customer = await models.Customer.findByPk(id)
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer
  }

  async updateCustomer(id, changes) {
    const customer = await this.findOne(id)
    const response = await customer.update(changes)
    return response
  }

  async deleteCustomer(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return { id }
  }
}

module.exports = CustomerService
