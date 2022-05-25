const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

const secret = config.jwtSecret
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsIm5hbWUiOiJBbGRvIiwiaWF0IjoxNjUzNDQwNTQ3fQ.Q9Gp7NfXG87wR6ctEh5iCLficIv1A2kn2wf7R8_QUFA'

function verifyToken (token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret)
console.log(payload)
