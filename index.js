const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000

app.get('/home', (req, res) => {
  res.send('Bienvenido al sitio web de PROFLOR DEL NORTE')
})

app.get('/categories', (req, res) => {
  res.send('Descubre las categorias de nuestra tienda')
})

app.get('/products', (req, res) => {
  const products = []
  const { size } = req.query
  const limit = size || 10
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }
  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter')
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


app.get('/users', (req, res) => {
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

app.listen(port, () => {
  console.log('Mi port', port)
})
