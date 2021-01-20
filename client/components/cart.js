import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  removeSingleCartItem,
  removeAllCartItems,
  checkout
} from '../store/order';
import { withRouter } from 'react-router-dom';

const Cart = withRouter(
  class extends Component {
    componentDidMount() {
      this.props.getCart(this.props.cart);
      console.log('in the if statement in cdm', this.props);
    }

    render() {
      let isLoggedIn = true;

      // if (this.props.user.id) {
      // this.props.getCart(this.props.cart);
      //   console.log('in the if statement in cdm', this.props.user);
      // }

      //const { cart } = this.props;
      // console.log('this.props', this.props);
      console.log('this.props.cart in render method', this.props.cart);

      const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return (
      <div>
        {}
        <section className="welcome">
          <h1>
            {isLoggedIn
              ? `Welcome ${this.props.user.firstName}`
              : `Welcome Guest`}
          </h1>
        </section>
        <section>
          <div>
            <section className="cart-items">
              <h2>Items in your cart: </h2>
              <ul className="cart-item">
                {this.props.cart.map((cartItem) => (
                  <div key={cartItem.id}>
                    <li className="name">{cartItem.name}</li>
                    <li>
                      <img src={cartItem.imageUrl} alt={cartItem.name} />
                    </li>
                    <li>
                      <span>Price:</span> {formatter.format(cartItem.price / 100)}
                    </li>
                    <li>
                      <label htmlFor="quantity">
                        <span>Quantity: </span>
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        placeholder={cartItem.order_product.quantity}
                      ></input>
                    </li>
                    <li>
                      <span>Total:</span>{' '}
                      {formatter.format(
                        (cartItem.price * cartItem.order_product.quantity) / 100
                      )}
                    </li>
                    <button className="button primary">Remove</button>
                  </div>
                ))}
              </ul>
              <h3>Cart Total:{' '}
                {this.props.cart.length !== 0
                  ? formatter.format(
                      this.props.cart.reduce((final, cartItem) => {
                        let count =
                          cartItem.price * cartItem.order_product.quantity;
                        return count + final;
                      }, 0) / 100
                    )
                  : 'Roll on over to Start Shopping!'}</h3>
            </section>
              <section className="checkout">
              {this.props.cart.length !== 0 ? (
              <button
                  className="checkoutButton"
                  type="button"
                  onClick={() => {
                    this.props.checkout();
                  
                    this.props.history.push('/order-confirmed');
                  }}
                >
                  Checkout
                </button>
            ) : (
              <br />
            )} 
            </section>
          </div>
        </section>
      </div>
    );

  }
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user.user,
    cart: state.order.cart
    // cartItem: state.cartItem
  };
};

/**
 * CONTAINER
 */
const mapDispatch = (dispatch) => {
  return {
    getCart: (cart) => dispatch(getCart(cart)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    removeSingleCartItem: (cartItem) =>
      dispatch(removeSingleCartItem(cartItem)),
    removeAllCartItems: (cart) => dispatch(removeAllCartItems(cart)),
    checkout: () => dispatch(checkout())
  };
};

export default connect(mapState, mapDispatch)(Cart);
