const express = require('express')

const ProductService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema')

const router = express.Router()
const service = new ProductService()

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.findProducts(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOneProduct(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.createProduct(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.updateProduct(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await service.deleteProduct(id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
