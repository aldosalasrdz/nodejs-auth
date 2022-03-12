const express = require('express')
const faker = require('faker')

const router = express.Router()


router.get('/', (req, res) => {
  const categories = []
  const { size } = req.query
  const limit = size || 10
  for (let i = 0; i < limit; i++) {
    categories.push({
      category: faker.commerce.department(),
    })
  }
  res.json(categories)
})

// Endpoint con múltiples parámetros
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    category: faker.commerce.department()
  })
})

router.post('/', (req, res) => {
  const body = req.body
  res.json({
    message: 'created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  res.json({
    message: 'update',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    message: 'deleted',
    id
  })
})

module.exports = router
