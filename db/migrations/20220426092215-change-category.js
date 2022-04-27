'use strict'

const { DataTypes } = require('sequelize')

const { CATEGORY_TABLE } = require('../models/category.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CATEGORY_TABLE, 'name', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    })
  },

  async down () {

  }
}
