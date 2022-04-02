const Joi = require('joi')

const id = Joi.string().uuid()
const firstName = Joi.string().min(3).max(15)
const lastName = Joi.string().min(3).max(15)
const gender = Joi.string().min(3).max(15)
const isPrivate = Joi.boolean()

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  gender: gender.required(),
  isPrivate: isPrivate.required()
})

const updateUserSchema = Joi.object({
  firstName,
  lastName,
  gender,
  isPrivate
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }

