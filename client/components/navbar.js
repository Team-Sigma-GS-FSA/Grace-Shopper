import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, userName }) => (
  <div>
    <h1>CAROUSELS R' US</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
      {isLoggedIn ? (
        <div>
          <Link to="/">{userName}</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart (0 items)</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Guest</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">Cart (0 items)</Link>
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
    isLoggedIn: !!state.user.user.id
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
