const express = require('express')

const CategoriesService = require('../services/category.service')

const router = express.Router()
const service = new CategoriesService()

router.get('/', (req, res) => {
  const categories = service.find()
  res.json(categories)
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const category = service.findOne(id)
  res.json(category)
})

router.post('/', (req, res) => {
  const body = req.body
  const newCategory = service.create(body)
  res.status(201).json(newCategory)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const category = service.update(id, body)
  res.json(category)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const response = service.delete(id)
  res.json(response)
})

module.exports = router
