import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  removeSingleCartItem,
  removeAllCartItems
} from '../store/order';

class Cart extends Component {
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

    return (
      <div>
        {}
        <section className="welcome">
          <h1>{isLoggedIn ? `Welcome Strongest Avenger` : `Welcome Guest`}</h1>
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
                      <span>Price:</span> ${cartItem.price / 100}
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
                      {cartItem.order_product.totalPrice / 100}
                    </li>
                    <button className="button primary">Remove</button>
                  </div>
                ))}
              </ul>
              <h3>Cart Total: 1,100,000</h3>
            </section>
            <section className="checkout">
              <button className="button primary">Checkout</button>
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
    removeAllCartItems: (cart) => dispatch(removeAllCartItems(cart))
  };
};

export default connect(mapState, mapDispatch)(Cart);
