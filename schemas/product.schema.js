const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().strict().integer().min(10)
const image = Joi.string().uri()
const isBlock = Joi.boolean().strict()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required()
})

const updateProductSchema = Joi.object({
  name,
  price: price.required(),
  image,
  isBlock
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }

