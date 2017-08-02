const express = require('express')
const path = require('path')
const port = process.env.port || 3000
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const products = './products.json'

app.use('/', express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  let options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  }
  res.sendFile('index.html', options, (err) => {
    if (err) next(err)
    else {
      console.log('sent')
    }
  })
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
  fs.writeFile(products, req.body, (err, file) => {
    if (err) return res.status(500).send('There was a problem with saving products')
    res.status(200).send('ok')
  })
})
