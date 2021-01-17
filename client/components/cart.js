import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  removeSingleCartItem,
  removeAllCartItems
} from '../store/order';

class Cart extends Component {
  componentDidMount() {
    console.log(this.props);
    console.log('this.props.user', this.props.user);
    if (this.props.user.id) {
      this.props.getCart(this.props.user.id);
    }
  }

  render() {
    let isLoggedIn = true;
    return (
      <div>
        <section className="welcome">
          <h1>{isLoggedIn ? `Welcome Strongest Avenger` : `Welcome Guest`}</h1>
        </section>
        <section>
          <div>
              <section className="cart-items">
                <h1>Items in your cart: </h1>
                <ul>
                  <li>Rolls Royce Carousel</li>
                  <li>
                    <img
                      src="https://intermarkridegroup.com/images/used/carousels/rolls-royce-carousel-full.jpg"
                      alt="Rolls Royce Carousel"
                    />
                  </li>
                  <li>Price: $999999.99</li>
                  <li>Quantity: 2</li>
                  <li>Total: 1,100,000</li>
                  <button>Delete</button>
                </ul>
                <h3>Cart Total: 1,100,000</h3>
              </section>
              <section className="checkout">
                <button className="checkoutButton">Checkout</button>
              </section>
            </div>
        </section>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('state.user.user in mapState', state.user.user);
  return {
    user: state.user.user,
    cart: state.cart,
    cartItem: state.cartItem
  };
};

/**
 * CONTAINER
 */
const mapDispatch = (dispatch) => {
  return {
    getCart: (id) => dispatch(getCart(id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    removeSingleCartItem: (cartItem) =>
      dispatch(removeSingleCartItem(cartItem)),
    removeAllCartItems: (cart) => dispatch(removeAllCartItems(cart))
  };
};

export default connect(mapState, mapDispatch)(Cart);
