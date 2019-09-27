import React, { Component } from 'react'
import AlertStripe, { ErrorStripe } from './formComponents/AlertStripe'

class Spinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeOut: false
    }
  }
  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ timeOut: true })
    }, 10000)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return this.state.timeOut ? (
      <ErrorStripe show={true} message="API calls to basta backend timed out." />
    ) : (
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  }
}

export default Spinner
