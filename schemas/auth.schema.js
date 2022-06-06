const Joi = require('joi')

const email = Joi.string().email()
const token = Joi.string().pattern(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
const newPassword = Joi.string().min(8)

const recoveryPasswordSchema = Joi.object({
  email: email.required()
})

const validateNewPassword = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

module.exports = { recoveryPasswordSchema, validateNewPassword }
