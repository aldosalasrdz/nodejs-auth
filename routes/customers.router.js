const express = require('express')

const CustomerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema')

const router = express.Router()
const service = new CustomerService()

router.get('/', async (req, res, next) => {
  try {
    const products = await service.findCustomer()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOneCustomer(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.createCustomer(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.updateCustomer(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await service.deleteCustomer(id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
