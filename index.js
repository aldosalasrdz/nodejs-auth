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
  res.json({
    name: 'Product 1',
    price: 1000
  })
})

app.listen(port, () => {
  console.log('Mi port', port)
})
