/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class ProductService {
  constructor () {}

  async createProduct (data) {
    const newProduct = await models.Product.create(data)
    return newProduct
  }

  async findProducts (query) {
    const options = {
      include: ['category']
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    const products = await models.Product.findAll(options)
    return products
  }

  async findOneProduct (id) {
    const product = await models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }

  async updateProduct (id, changes) {
    const product = await this.findOneProduct(id)
    const response = await product.update(changes)
    return response
  }

  async deleteProduct (id) {
    const product = await this.findOneProduct(id)
    await product.destroy()
    return { id }
  }
}

module.exports = ProductService
