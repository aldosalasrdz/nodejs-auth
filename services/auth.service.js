/* eslint-disable no-useless-constructor */
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { config } = require('../config/config')

const UserService = require('./user.service')
const service = new UserService()

class AuthService {
  async getUser (email, password) {
    const user = await service.findUserByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      throw boom.unauthorized()
    }
    delete user.dataValues.password
    return user
  }

  signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    }
  }

  async sendMail (email) {
    const user = await service.findUserByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPassword
      }
    })

    await transporter.sendMail({
      from: config.nodemailerUser,
      to: user.email,
      subject: 'Prueba de correo',
      text: 'Correo enviado con Nodemailer',
      html: '<b>Correo enviado con Nodemailer</b>'
    })
    return { message: 'Mail sent successfully' }
  }
}

module.exports = AuthService
