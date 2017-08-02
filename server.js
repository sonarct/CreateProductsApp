const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const port = process.env.port || 3000
const app = express()
const products = './products.json'

app.use('/', express.static(path.join(__dirname, 'build')))

app.listen(port, () => {
  console.log('express is listening on ' + port)
})

app.use(bodyParser.text())
app.use(bodyParser.json())

app.get('/products', (req, res) => {
  fs.readFile(products, 'utf8', (err, data) => {
    if (err) return res.status(500).send('There was a problem with getting products')
    res.status(200).send('ok')
  })
})

app.post('/products', (req, res) => {
  fs.writeFile(products, req.body, (err, file) => {
    if (err) return res.status(500).send('There was a problem with saving products')
    res.status(200).send('ok')
  })
})
