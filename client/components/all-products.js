import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProducts } from '../store/product';
import { addToCart } from '../store/order';
import SideCart from './side-cart';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }

  addItemsToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
  };

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
                                this.addItemsToCart(product);
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
            <div className="sidebar">
              <SideCart cartItems={this.state.cartItems} />
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
  addToCart: (user, cartItem) => dispatch(addToCart(user, cartItem))
});

export default connect(mapState, mapDispatch)(AllProducts);
