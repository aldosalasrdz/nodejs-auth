'use strict'

const { DataTypes, Sequelize } = require('sequelize')

const { UserSchema, USER_TABLE } = require('../models/user.model')
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model')
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model')
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model')
const { ORDER_TABLE } = require('../models/order.model')
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-product.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema)
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      delivered: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      customerId: {
        allowNull: false,
        field: 'customer_id',
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
    await queryInterface.dropTable(ORDER_TABLE)
    await queryInterface.dropTable(CUSTOMER_TABLE)
    await queryInterface.dropTable(PRODUCT_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
    await queryInterface.dropTable(USER_TABLE)
  }
}
