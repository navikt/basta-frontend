import React, { Component } from 'react'

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
    }, 4000)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return this.state.timeOut ? (
      <div className="timeOut">¯\_(ツ)_/¯</div>
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
