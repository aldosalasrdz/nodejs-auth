const Joi = require('joi')

const id = Joi.number().integer()
const customerId = Joi.number().integer()
const delivered = Joi.boolean()

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  delivered
})

const getOrderSchema = Joi.object({
  id: id.required()
})

module.exports = { createOrderSchema, getOrderSchema }

