import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUser } from '../store/user';
import UserSignupForm from './user-signup-form';

const defaultState = {
  firstName: '',
  lastName: '',
  type: 'consumer',
  email: '',
  password: '',
  street: '',
  city: '',
  state: 'AL',
  postalCode: '',
  country: 'United States',
  cardType: 'visa',
  cardNumber: '',
  cardExpMonth: '01',
  cardExpYear: '21'
};

class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      ...defaultState,
      errorMessage: null,
      redirect: null,
      hidden: true
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleShow() {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  }
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
    console.log('after', this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('state', this.state.state);
    try {
      await this.props.createUser(this.state);
      this.setState({ defaultState, redirect: '/products' });
    } catch (error) {
      this.setState({
        errorMessage: `Please try again. There was a problem creating your account: ${error.message}.`
      });
    }
  }

  render() {
    const { redirect, errorMessage } = this.state;

    //let user know if there was an error

    // if (errorMessage) {
    //   return <h2>{errorMessage}</h2>;
    // }

    // redirect to all UserHome on POST success
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <UserSignupForm
        {...this.state}
        toggleShow={this.toggleShow}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
// Connect and Export React-Redux Component
const mapState = (state) => ({
  user: state.user
});

const mapDispatch = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user))
  };
};

export default connect(mapState, mapDispatch)(UserSignUp);
