import React from 'react';
import { connect } from 'react-redux';
//import {Link} from 'react-router-dom'

import { getProducts } from '../store/product';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { allProducts } = this.props.products;
    console.log('All Products firing');
    console.log(allProducts[1]);
    return (
      <div>
        {allProducts.length
          ? allProducts.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <h5>{product.price}</h5>
              </div>
            ))
          : 'No Products Available!'}
      </div>
    );
  }
}

const mapState = (state) => ({ products: state.products });

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(getProducts())
});

export default connect(mapState, mapDispatch)(AllProducts);
