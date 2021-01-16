import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUser } from '../store/user';
import UserSignupForm from './user-signup-form';
// const {valNewRobotForm} = require('./formValidation')

const defaultState = {
  firstName: '',
  lastName: '',
  type: 'consumer',
  email: '',
  password: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
  cardType: '',
  cardNumber: '',
  cardExpMonth: '',
  cardExpYear: ''
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
    this.setState({ hidden: !this.state.hidden });
  }
  handleChange(event) {
    console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value
    });
    // let errorLog = valNewRobotForm(this.state)
    // if (errorLog === []) {
    //   return this.setState({errors: []})
    // } else {
    //   return this.setState({errors: errorLog})
    // }
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('cardType', this.state);
    try {
      await this.props.createUser(this.state);
      this.setState({ defaultState, redirect: '/account' });
    } catch (error) {
      this.setState({
        errorMessage: `Please try again. There was a problem creating your account: ${error.message}.`
      });
    }
  }

  render() {
    const { redirect, errorMessage } = this.state;

    if (errorMessage) {
      return <h2>{errorMessage}</h2>;
    }

    // redirect to all Robots on POST success
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
