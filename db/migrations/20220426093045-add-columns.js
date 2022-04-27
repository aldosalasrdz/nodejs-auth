'use strict'

const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model')
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CATEGORY_TABLE, 'image', CategorySchema.image)
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORY_TABLE, 'image')
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description')
  }
}
