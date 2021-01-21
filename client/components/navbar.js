import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, userName, cartSize }) => (
  <div>
    <img className="bg" src="/img/night-carnival-lights.jpeg" />
    <h1 className="center">GYRE</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <Link to="/products">All Products</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">All Products</Link>
        </div>
      )}
      {isLoggedIn ? (
        <div>
          <Link to="/">
            <strong>{userName}</strong>
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">
            Cart ({cartSize} {cartSize === 1 ? 'item' : 'items'})
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <strong>Guest</strong>
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">
            Cart ({cartSize} {cartSize === 1 ? 'item' : 'items'})
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userName: state.user.user.firstName,
    isLoggedIn: !!state.user.user.id,
    cartSize: state.order.cart.length
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
