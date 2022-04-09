const faker = require('faker')
const boom = require('@hapi/boom')

const pool = require('../libs/postgres.pool')

class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
    this.pool = pool
    this.pool.on('error', err => console.log(err))
  }

  generate() {
    const limit = 100
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        category: faker.commerce.department()
      })
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  async find() {
    const query = 'SELECT * FROM tasks'
    const response = await this.pool.query(query)
    return response.rows
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id)
    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Category not found')
    }
    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Category not found')
    }
    this.categories.splice(index, 1)
    return { id }
  }
}

module.exports = CategoriesService
