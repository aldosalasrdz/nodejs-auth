'use strict'

const { DataTypes, Sequelize } = require('sequelize')

const { ORDER_TABLE } = require('../models/order.model')

module.exports = {
  async up (queryInterface) {
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
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE)
  }
}
