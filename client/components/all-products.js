import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProducts } from '../store/product';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      sort: ''
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { allProducts } = this.props.products;
    console.log('All Products firing');
    console.log(allProducts[1]);
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <ul className="products">
                {allProducts.length
                  ? allProducts.map((product) => (
                      <li key={product.id}>
                        <div className="product">
                          <Link to={`/products/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} />
                            <h3>{product.name}</h3>
                          </Link>
                          <div className="product-price">
                            <div>
                              <h5>${product.price / 100}</h5>
                            </div>
                            <button className="button primary">
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  : 'No Products Available!'}
              </ul>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
      </div>
    );
  }
}

const mapState = (state) => ({ products: state.products });

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(getProducts())
});

export default connect(mapState, mapDispatch)(AllProducts);
