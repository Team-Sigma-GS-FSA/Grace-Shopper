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
              <div
                className="w3-card"
                style={{ width: '20rem', paddingBottom: 10 }}
                key={product.id}
              >
                <header className="w3-container w3-blue-grey">
                  <h3>{product.name}</h3>
                </header>
                <img src={product.imageUrl} />
                <h5>${product.price / 100}</h5>

                <footer className="w3-container w3-blue-grey">
                  <center>
                    <button className="w3-button w3-blue-grey">Add to cart!</button>
                  </center>
                </footer>
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
