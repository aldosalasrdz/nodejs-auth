const express = require('express')

const UsersService = require('../services/user.service')

const router = express.Router()
const service = new UsersService()

router.get('/', async (req, res) => {
  const users = await service.find()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    res.json(user)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const newUser = await service.create(body)
  res.status(201).json(newUser)
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body
    const user = await service.update(id, body)
    res.json(user)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await service.delete(id)
    res.json(response)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

module.exports = router
