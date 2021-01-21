import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import Slider from 'react-slick';

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true
};
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div
        className="w3-card-4 w3-light-blue"
        style={{
          width: '20rem',
          position: 'relative',
          borderRadius: '25px',
          height: '18rem',
          marginLeft: '38%',
          opacity: '.85'
        }}
      >
        <form onSubmit={handleSubmit} name={name}>
          <div className="center">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" placeholder="email" />
          </div>
          <br />
          <div className="center">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" placeholder="password" />
          </div>
          <br />
          <div>
            <button type="submit" style={{ marginLeft: '7rem' }}>
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {/* <a
          href="/auth/google"
          className="button"
          style={{
            marginLeft: '5.6rem'
          }}
        >
          {displayName} with Google
        </a> */}
      </div>

      <div className="slick-container">
        <Slider {...settings}>
          <div>
            <img src="./img/scarycarousel.jpeg" alt="featured carousel" />
          </div>
          <div>
            <img src="./img/kidscarousel.jpeg" alt="featured merry-go-round" />
          </div>
          <div>
            <img src="./img/brightcarousel.jpeg" alt="bright carousel" />
          </div>
          <div>
            <img
              src="./img/Carousel-10-at-night.jpeg"
              alt="featured carousel"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
