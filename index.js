const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Acceso no permitido'))
    }
  }
}

app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hola mi server en Express')
})

routerApi(app)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port', port)
})
