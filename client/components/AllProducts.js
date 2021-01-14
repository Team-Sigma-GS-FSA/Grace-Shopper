import React from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'

import {getProducts} from '../store/product'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {projects} = this.props
    console.log('All Products firing')
    return <h1>Welcome to my Carousel Hell</h1>
  }
}

const mapState = state => ({products: state.products})

const mapDispatch = dispatch => ({getProducts: () => dispatch(getProducts())})

export default connect(mapState, mapDispatch)(AllProducts)
