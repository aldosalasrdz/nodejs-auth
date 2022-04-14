const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const price = Joi.number().strict().integer().min(10)
const image = Joi.string().uri()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updateProductSchema = Joi.object({
  price: price.required()
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }

