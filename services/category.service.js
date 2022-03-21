const faker = require('faker')

class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
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
    return this.categories
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id)
    if (category) {
      return category
    } else {
      throw new Error('Category not found')
    }
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Category not found')
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
      throw new Error('Product not found')
    }
    this.categories.splice(index, 1)
    return { id }
  }
}

module.exports = CategoriesService
