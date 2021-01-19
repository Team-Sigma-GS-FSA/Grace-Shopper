import React, { Component } from 'react';

export default class SideCart extends Component {
  render() {
    const { cartItems } = this.props;
    console.log('cartitems in sidecart', cartItems);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in your cart
          </div>
        )}
        <div>
          <div className="cart">
            <ul>
              {cartItems &&
                cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={item.imageUrl} alt={item.name}></img>
                    </div>
                    <div className="name">{item.name}</div>
                    <button
                      className="button primary"
                      onClick={() => this.props.removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
