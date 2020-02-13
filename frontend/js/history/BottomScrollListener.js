import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class BottomScrollListener extends Component {
  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll.bind(this))
  }

  handleOnScroll() {
    const scrollNode = document.scrollingElement || document.documentElement
    if (scrollNode.scrollHeight - 200 <= scrollNode.scrollTop + window.innerHeight) {
      this.props.onBottom()
    }
  }

  render() {
    return null
  }
}

BottomScrollListener.propTypes = {
  onBottom: PropTypes.func
}

export default BottomScrollListener
