const express = require('express')
const path = require('path')
const port = process.env.port || 80
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const products = './products.json'

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.use('/', express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.status(200).send('Main page')
})

app.listen(port, () => {
  console.log('express is listening on ' + port)
})

app.use(bodyParser.text())
app.use(bodyParser.json())

app.get('/products', (req, res) => {
  fs.readFile(products, 'utf8', (err, data) => {
    if (err) return res.status(500).send('There was a problem with getting products')
    res.status(200).send(data)
  })
})

app.post('/products', (req, res) => {
  console.log(req.body)
  fs.writeFile(products, req.body, (err, file) => {
    if (err) return res.status(500).send('There was a problem with saving products')
    res.status(200).send('ok')
  })
})
