/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')
const { User } = require('../db/models/user.model')

const { models } = require('./../libs/sequelize')

class OrderService {
  constructor () {}

  async createOrder (data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found')
    }
    const newOrder = await models.Order.create({
      customerId: customer.id
    })
    return newOrder
  }

  async addItem (data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }

  async findOrdersByUser (userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: [{
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'recoveryToken']
          }
        }]
      }]
    })
    return orders
  }

  async findOrders () {
    const orders = await models.Order.findAll({
      include: ['items']
    })
    return orders
  }

  async findOneOrder (id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: [{
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'recoveryToken']
          }
        }]
      },
      'items'
      ]
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
