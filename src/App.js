import React, {Component} from 'react'
import AddForm from './AddForm'
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'

const productsUrl = '/products'

class App extends Component {
  constructor (props) {
    super(props)

    this.addProduct = this.addProduct.bind(this)

    this.state = {
      colors: [],
      products: []
    }
  }

  componentDidMount () {
    fetch(productsUrl).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        colors: json.colors,
        products: json.products
      })
    })
  }

  addProduct (product) {
    this.setState((prevState) => {
      return prevState.products.push(product)
    }, this.saveProducts)
  }

  saveProducts () {
    const data = JSON.stringify(this.state)

    fetch(productsUrl, {
      method: 'POST',
      body: data
    })
  }

  render () {
    let products = this.state.products.map((product, i) => {
      let color

      switch (product.color) {
        case 0:
          color = 'danger'
          break
        case 1:
          color = 'success'
          break
        case 2:
          color = 'info'
          break
        default:
          break
      }

      return (
        <ListGroupItem
          bsStyle={color}
          key={i} >
          <div>
            {product.name}
          </ div>
          <div>
            {this.state.colors[product.color]}
          </div>
        </ ListGroupItem>
      )
    })

    return (
      <div>
        <Grid style={{
          marginTop: '40px'
        }}>
          <Row>
            <Col xs={12} md={6} lg={6}
              lgOffset={3} mdOffset={3} >
              <AddForm onSubmit={this.addProduct}
                selectItems={this.state.colors}
                defaultSelectItem={0} />
              <h3>Products</ h3>
              <ListGroup>
                {products}
              </ListGroup>
            </ Col>
          </ Row>
        </ Grid>
      </div>
    )
  }
}

export default App
