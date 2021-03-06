const express = require('express')
const passport = require('passport')

const CategoryService = require('../services/category.service')
const validatorHandler = require('../middlewares/validator.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema')

const router = express.Router()
const service = new CategoryService()

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await service.findOneCategory(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.createCategory(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const category = await service.updateCategory(id, body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      console.log(req.headers)
      const response = await service.deleteCategory(id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
