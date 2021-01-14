import React, {Component} from 'react'
import product from '../store/product'

export default class Cart extends Component {
  render() {
    let isLoggedIn = true
    let isNotEmpty = true
    return (
      <div>
        <section className="welcome">
          <h1>{isLoggedIn ? `Welcome Strongest Avenger` : `Welcome Guest`}</h1>
        </section>
        <section>
          {isNotEmpty ? (
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
          ) : (
            <h1>Your cart is empty</h1>
          )}
        </section>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//cart: state.cart
//   }
// }

/**
 * CONTAINER
 */
// const mapDispatch = (dispatch) => {
//   return {
//getProducts: () => dispatch(getProducts())
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)
