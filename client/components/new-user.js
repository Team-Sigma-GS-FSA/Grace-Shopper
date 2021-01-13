/* eslint-disable jsx-quotes */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {postNewRobot} from '../redux/addNewRobot'
import FormNewRobot from './formNewRobot'
const {valNewRobotForm} = require('./formValidation')

const defaultState = {
  name: '',
  fuelType: 'electric'
}

export class AddNewRobot extends Component {
  constructor() {
    super()
    this.state = {
      ...defaultState,
      errors: [],
      errorMessage: null,
      redirect: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    let errorLog = valNewRobotForm(this.state)
    if (errorLog === []) {
      return this.setState({errors: []})
    } else {
      return this.setState({errors: errorLog})
    }
  }

  async handleSubmit(event) {
    event.preventDefault()

    try {
      await this.props.postNewRobot(this.state)
      this.setState({defaultState, redirect: '/robots'})
    } catch (error) {
      this.setState({
        errorMessage: `Please try again. There was a problem creating your account: ${
          error.message
        }.`
      })
    }
  }

  render() {
    const {redirect, errorMessage} = this.state

    if (errorMessage) {
      return <h2>{errorMessage}</h2>
    }

    // redirect to all Robots on POST success
    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <FormNewRobot
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}
// Connect and Export React-Redux Component
const mapState = state => ({
  newRobot: state.newRobot
})

const mapDispatch = dispatch => {
  return {
    postNewRobot: robot => dispatch(postNewRobot(robot))
  }
}

export default connect(mapState, mapDispatch)(AddNewRobot)
