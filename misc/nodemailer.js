const nodemailer = require('nodemailer')

const { config } = require('../config/config')

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail () {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: config.nodemailerUser,
      pass: config.nodemailerPassword
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '', // sender address
    to: '', // list of receivers
    subject: 'Prueba de correo', // Subject line
    text: 'Correo enviado con Nodemailer', // plain text body
    html: '<b>Correo enviado con Nodemailer</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail()
