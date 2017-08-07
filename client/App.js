import React from 'react'
import {render} from 'react-dom'
import {Col} from 'react-bootstrap'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      products: []
    }

    this.createProduct = this.createProduct.bind(this)
    this.getProducts = this.getProducts.bind(this)
  }

  componentDidMount() {
    this.getProducts()
  }

  createProduct({name, color}) {
    const options = {
      method: 'POST',
      body: JSON.stringify({name, color}),
      headers: {
        'content-type': 'application/json'
      }
    }
    window.fetch('/api/products', options)
      .then(() => {
        this.getProducts()
      })
  }

  getProducts() {
    window.fetch('/api/products')
      .then((res) => res.json())
      .then((products) => {
        this.setState({products})
      })
  }

  render() {
    const {products} = this.state
    return (
      <div className="container">
        <Col md={4}>
          <h1>Form</h1>
          <hr/>
          <ProductForm onSubmit={this.createProduct} />
        </Col>
        <Col md={8}>
          <h1>Products</h1>
          <hr/>
          {products.length
            ? <ProductTable products={products} />
            : 'No products created'
          }
        </Col>
      </div>
    )    
  }
}

render(<App />, document.querySelector('.app'))
