/* eslint-disable camelcase */
const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(255)
const price = Joi.number().integer().min(10)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const min_price = Joi.number().integer()
const max_price = Joi.number().integer()

const limit = Joi.number().integer().min(1)
const offset = Joi.number().integer().min(0)

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId
})

const getProductSchema = Joi.object({
  id: id.required()
})

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  min_price,
  max_price: max_price.greater(Joi.ref('min_price'))
}).with('min_price', 'max_price')
  .with('max_price', 'min_price')

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
