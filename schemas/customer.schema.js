const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const lastName = Joi.string()
const phone = Joi.string().length(10).pattern(/^[0-9]+$/)
const userId = Joi.number().integer()

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone,
  userId: userId.required()
})

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
