const express = require('express')

const CategoriesService = require('../services/category.service')

const router = express.Router()
const service = new CategoriesService()

router.get('/', async (req, res) => {
  const categories = await service.find()
  res.json(categories)
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await service.findOne(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const newCategory = await service.create(body)
  res.status(201).json(newCategory)
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const category = await service.update(id, body)
  res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await service.delete(id)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
