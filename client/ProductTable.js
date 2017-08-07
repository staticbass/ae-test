import React from 'react'
import {Table} from 'react-bootstrap'
import PropTypes from 'prop-types'

const ProductTable = (props) => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
      {ProductTable.renderRows(props.products)}
      </tbody>
    </Table>
  )
}

ProductTable.renderRows = (products) => {
  return products.map(({name, color}, i) => {
    return (
      <tr key={i}>
        <td>{name}</td>
        <td>{color}</td>
      </tr>
    )
  })
}

ProductTable.tTabTypes = {
  products: PropTypes.array.isRequired
}

export default ProductTable
