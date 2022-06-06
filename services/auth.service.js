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
    delete user.dataValues.recoveryToken
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

  async sendRecoveryLink (email) {
    const user = await service.findUserByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.updateUser(user.id, { recoveryToken: token })
    const mail = {
      from: config.nodemailerUser,
      to: user.email,
      subject: 'Password recovery email',
      html: `<b>Click on the following link to recover your password: ${link}</b>`
    }
    const response = await this.sendMail(mail)
    return response
  }

  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await service.findOneUser(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.updateUser(user.id, { recoveryToken: null, password: hash })
      return { message: 'Password successfully changed' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

  async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPassword
      }
    })

    await transporter.sendMail(infoMail)
    return { message: 'Mail sent successfully' }
  }
}

module.exports = AuthService
