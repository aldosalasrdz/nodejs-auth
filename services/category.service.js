/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class CategoryService {
  constructor () {}

  async createCategory (data) {
    const newCategory = await models.Category.create(data)
    return newCategory
  }

  async findCategory () {
    const categories = await models.Category.findAll()
    return categories
  }

  async findOneCategory (id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async updateCategory (id, changes) {
    const category = await this.findOneCategory(id)
    const response = await category.update(changes)
    return response
  }

  async deleteCategory (id) {
    const category = await this.findOneCategory(id)
    await category.destroy()
    return { id }
  }
}

module.exports = CategoryService
