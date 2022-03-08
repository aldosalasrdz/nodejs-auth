const express = require('express')
const app = express()
const port = 3000

app.get('/home', (req, res) => {
  res.send('Bienvenido al sitio web de PROFLOR DEL NORTE')
})

app.get('/categories', (req, res) => {
  res.send('Descubre las categorias de nuestra tienda')
})

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000
    },
    {
      name: 'Product 2',
      price: 2000
    }
  ])
})

// Endpoint con parámetros
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  })
})

// Endpoint con múltiples parámetros
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

app.get('/category/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    category: 'Product category'
  })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    type: 'User type'
  })
})

app.listen(port, () => {
  console.log('Mi port', port)
})
