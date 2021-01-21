import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store/product';
import { addToCart, _addToCart } from '../store/order';
import { addToGuestCart } from '../guest';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { allProducts } = this.props.products;
    const { user } = this.props.user;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

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
                              <h5>{formatter.format(product.price / 100)}</h5>
                            </div>
                            <button
                              type="button"
                              className="button primary"
                              onClick={() => {
                                if (user.id) {
                                  this.props.addToCart(product);
                                } else {
                                  product.orders[0].order_product.quantity = 1;
                                  this.props._addToCart(product);
                                  addToGuestCart(product);
                                }
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  : 'Loading ...'}
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
  addToCart: (cartItem) => dispatch(addToCart(cartItem)),
  _addToCart: (cartItem) => dispatch(_addToCart(cartItem))
});

export default connect(mapState, mapDispatch)(AllProducts);
