import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProducts } from '../store/product';
import { addToCart } from '../store/order';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { allProducts } = this.props.products;
    const { user } = this.props.user;
    // console.log('user in render', user);
    // console.log('this.props in render allproducts', this.props);
    // console.log('All Products firing');
    // console.log(allProducts[1]);
    return (
      <div className="grid-container">
        <header>
          <a href="/" className="header-text">
            Products
          </a>
          <h3>{allProducts.length} Products</h3>
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
                            <br />
                            <br />
                            <h3>{product.name}</h3>
                          </Link>
                          <div className="product-price">
                            <div>
                              <h5>${product.price / 100}</h5>
                            </div>
                            <button
                              className="button primary"
                              onClick={() => {
                                this.props.addToCart(product);
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  : 'No Products Available!'}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.products,
  user: state.user
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (cartItem) => dispatch(addToCart(cartItem))
});

export default connect(mapState, mapDispatch)(AllProducts);
