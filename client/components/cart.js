import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCart,
  removeSingleCartItem,
  removeAllCartItems
} from '../store/order';

class Cart extends Component {
  componentDidMount() {
    // try {
    //   if (this.props.user.id) {
    //     this.props.getCart(this.props.user);
    //     console.log('in the if statement in cdm', this.props.user);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  render() {
    let isLoggedIn = true;

    // if (this.props.user.id) {
    //   this.props.getCart(this.props.user);
    //   console.log('in the if statement in cdm', this.props.user);
    // }

    //const { cart } = this.props;
    console.log('this.props', this.props);
    console.log('this.props.user', this.props.user);

    return Object.entries(this.props.user).length ? (
      <div>
        <section className="welcome">
          <h1>{isLoggedIn ? `Welcome Strongest Avenger` : `Welcome Guest`}</h1>
        </section>
        <section>
          <div>
            <section className="cart-items">
              <h2>Items in your cart: </h2>
              <ul className="cart-item">
                <li className="name">Rolls Royce Carousel</li>
                <li>
                  <img
                    src="https://intermarkridegroup.com/images/used/carousels/rolls-royce-carousel-full.jpg"
                    alt="Rolls Royce Carousel"
                  />
                </li>
                <li>
                  <span>Price:</span> $999999.99
                </li>
                <li>
                  <span>Quantity:</span> 2
                </li>
                <li>
                  <span>Total:</span> 1,100,000
                </li>
                <button className="button primary">Remove</button>
                <li className="name">Rolls Royce Carousel</li>
                <li>
                  <img
                    src="https://intermarkridegroup.com/images/used/carousels/rolls-royce-carousel-full.jpg"
                    alt="Rolls Royce Carousel"
                  />
                </li>
                <li>
                  <span>Price:</span> $999999.99
                </li>
                <li>
                  <span>Quantity:</span> 2
                </li>
                <li>
                  <span>Total:</span> 1,100,000
                </li>
                <button className="button primary">Remove</button>
                <li className="name">Rolls Royce Carousel</li>
                <li>
                  <img
                    src="https://intermarkridegroup.com/images/used/carousels/rolls-royce-carousel-full.jpg"
                    alt="Rolls Royce Carousel"
                  />
                </li>
                <li>
                  <span>Price:</span> $999999.99
                </li>
                <li>
                  <span>Quantity:</span> 2
                </li>
                <li>
                  <span>Total:</span> 1,100,000
                </li>
                <button className="button primary">Remove</button>
                <li className="name">Rolls Royce Carousel</li>
                <li>
                  <img
                    src="https://intermarkridegroup.com/images/used/carousels/rolls-royce-carousel-full.jpg"
                    alt="Rolls Royce Carousel"
                  />
                </li>
                <li>
                  <span>Price:</span> $999999.99
                </li>
                <li>
                  <span>Quantity:</span> 2
                </li>
                <li>
                  <span>Total:</span> 1,100,000
                </li>
                <button className="button primary">Remove</button>
              </ul>
              <h3>Cart Total: 1,100,000</h3>
            </section>
            <section className="checkout">
              <button className="button primary">Checkout</button>
            </section>
          </div>
        </section>
      </div>
    ) : (
      <div>Guest Cart</div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('state in mapState', state);
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
    getCart: (user) => dispatch(getCart(user)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    removeSingleCartItem: (cartItem) =>
      dispatch(removeSingleCartItem(cartItem)),
    removeAllCartItems: (cart) => dispatch(removeAllCartItems(cart))
  };
};

export default connect(mapState, mapDispatch)(Cart);
