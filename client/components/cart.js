import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  updateCart,
  removeSingleCartItem,
  removeAllCartItems,
  checkout,
  _addToCart,
  _updateCart,
  _removeSingleCartItem,
  _removeAllCartItems
} from '../store/order';
import { withRouter } from 'react-router-dom';
import {
  getGuestCart,
  clearGuestCart,
  editGuestCart,
  removeFromGuestCart
} from '../guest';

const Cart = withRouter(
  class extends Component {
    constructor() {
      super();
      this.state = {
        quantities: {}
      };
    }

    componentDidMount() {
      if (this.props.user.id) {
        this.props.getCart(this.props.cart);
      } else {
        this.props._removeAllCartItems();
        const guestCart = getGuestCart();
        guestCart.forEach((product) => {
          this.props._addToCart(product);
        });
      }
    }

    handleChange = (event) => {
      this.setState({
        quantities: {
          ...this.state.quantities,
          [event.target.id]: +event.target.value
        }
      });
    };

    render() {
      let isLoggedIn;
      if (this.props.user.id) {
        isLoggedIn = true;
      }
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
            {this.props.cart.length ? (
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
                          <span>Price:</span>{' '}
                          {formatter.format(cartItem.price / 100)}
                        </li>
                        <li>
                          <label htmlFor={`quantity-${cartItem.id}`}>
                            <span>Quantity: </span>
                          </label>
                          <input
                            type="number"
                            id={`quantity-${cartItem.id}`}
                            name={`quantity-${cartItem.id}`}
                            min="0"
                            defaultValue={
                              cartItem.orders[0].order_product.quantity
                            }
                            onChange={this.handleChange}
                          ></input>
                          <button
                            className="button primary"
                            onClick={() => {
                              if (this.props.user.id) {
                                this.props.updateCart({
                                  id: cartItem.id,
                                  quantity: this.state.quantities[
                                    `quantity-${cartItem.id}`
                                  ]
                                });
                              } else {
                                cartItem.orders[0].order_product.quantity = this.state.quantities[
                                  `quantity-${cartItem.id}`
                                ];
                                editGuestCart(
                                  cartItem,
                                  this.state.quantities[
                                    `quantity-${cartItem.id}`
                                  ]
                                );
                                this.props._updateCart({
                                  cartItem
                                });
                              }
                            }}
                          >
                            Update
                          </button>
                        </li>
                        <li>
                          <span>Total:</span>{' '}
                          {formatter.format(
                            (cartItem.price *
                              cartItem.orders[0].order_product.quantity) /
                              100
                          )}
                        </li>
                        <button
                          className="button primary"
                          onClick={() => {
                            if (this.props.user.id) {
                              this.props.removeSingleCartItem(cartItem);
                            } else {
                              removeFromGuestCart(cartItem);
                              this.props._removeSingleCartItem(cartItem);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </ul>
                  <h3>
                    Cart Total:{' '}
                    {this.props.cart.length !== 0
                      ? formatter.format(
                          this.props.cart.reduce((final, cartItem) => {
                            let count =
                              cartItem.price *
                              cartItem.orders[0].order_product.quantity;
                            return count + final;
                          }, 0) / 100
                        )
                      : 'Roll on over to Start Shopping!'}
                  </h3>
                </section>
                <section className="checkout">
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
                  <button
                    className="button primary"
                    type="button"
                    onClick={() => {
                      if (this.props.user.id) {
                        this.props.removeAllCartItems();
                      } else {
                        clearGuestCart();
                        this.props._removeAllCartItems();
                      }
                    }}
                  >
                    Clear Cart
                  </button>
                </section>
              </div>
            ) : (
              <h1>There are no items in your cart</h1>
            )}
          </section>
        </div>
      );
    }
  }
);
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user.user,
    cart: state.order.cart,
    cartItem: state.order.cartItem
  };
};

/**
 * CONTAINER
 */
const mapDispatch = (dispatch) => {
  return {
    getCart: (cart) => dispatch(getCart(cart)),
    updateCart: (cartItem) => dispatch(updateCart(cartItem)),
    removeSingleCartItem: (cartItem) =>
      dispatch(removeSingleCartItem(cartItem)),
    removeAllCartItems: () => dispatch(removeAllCartItems()),
    checkout: () => dispatch(checkout()),
    _addToCart: (cartItem) => dispatch(_addToCart(cartItem)),
    _updateCart: (cartItem) => dispatch(_updateCart(cartItem)),
    _removeSingleCartItem: (cartItem) =>
      dispatch(_removeSingleCartItem(cartItem)),
    _removeAllCartItems: () => dispatch(_removeAllCartItems())
  };
};

export default connect(mapState, mapDispatch)(Cart);
