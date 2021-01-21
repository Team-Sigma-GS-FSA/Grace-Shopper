import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  updateCart,
  removeSingleCartItem,
  removeAllCartItems
} from '../store/order';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantities: {}
    };
  }

  componentDidMount() {
    this.props.getCart(this.props.cart);
  }

  handleChange = (event) => {
    this.setState({
      quantities: {
        ...this.state.quantities,
        [event.target.id]: +event.target.value
      }
    });
    console.log('this.state.quantities', this.state.quantities);
  };

  render() {
    let isLoggedIn;
    if (this.props.user) {
      isLoggedIn = true;
    }

    console.log('this.props in cart', this.propp);

    return (
      <div>
        {}
        <section className="welcome">
          {isLoggedIn ? (
            <h1>Welcome {this.props.user.firstName}</h1>
          ) : (
            <h1>Welcome Guest</h1>
          )}
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
                        <span>Price:</span> ${cartItem.price / 100}
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
                          onClick={() =>
                            this.props.updateCart({
                              id: cartItem.id,
                              quantity: this.state.quantities[
                                `quantity-${cartItem.id}`
                              ]
                            })
                          }
                        >
                          Update
                        </button>
                      </li>
                      <li>
                        <span>Total:</span>{' '}
                        {(cartItem.orders[0].order_product.quantity *
                          cartItem.price) /
                          100}
                      </li>
                      <button
                        className="button primary"
                        onClick={() => {
                          console.log(cartItem);
                          this.props.removeSingleCartItem(cartItem);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </ul>
                <h3>Cart Total: 1,100,000</h3>
              </section>
              <section className="checkout">
                <button className="button primary">Checkout</button>
                <button
                  className="button primary"
                  onClick={() => this.props.removeAllCartItems()}
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
    removeAllCartItems: () => dispatch(removeAllCartItems())
  };
};

export default connect(mapState, mapDispatch)(Cart);
