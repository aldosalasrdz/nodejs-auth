const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros')
  }
})

router.post('/', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      message: 'created',
      data: {
        limit,
        offset
      }
    })
  } else {
    res.json({
      message: 'No hay parametros'
    })
  }
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      message: 'update',
      data: {
        limit,
        offset
      },
      id
    })
  } else {
    res.json({
      message: 'No hay parametros'
    })
  }
})

module.exports = router
