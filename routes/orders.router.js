const express = require('express')

const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema')

const router = express.Router()
const service = new OrderService()

router.get('/', async (req, res, next) => {
  try {
    const products = await service.findOrders()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOneOrder(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.createOrder(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newItem = await service.addItem(body)
      res.status(201).json(newItem)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
