const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class OrderService {
  constructor () {}

  async createOrder (data) {
    const newOrder = await models.Order.create(data)
    return newOrder
  }

  async findOrder () {
    const orders = await models.Order.findAll()
    return orders
  }

  async findOneOrder (id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }]
    })
    if (!order) {
      throw boom.notFound('Order not found')
    }
    return order
  }

  async updateOrder (id, changes) {
    const order = await this.findOneOrder(id)
    const response = await order.update(changes)
    return response
  }

  async deleteOrder (id) {
    const order = await this.findOneOrder(id)
    await order.destroy()
    return { id }
  }
}

module.exports = OrderService
