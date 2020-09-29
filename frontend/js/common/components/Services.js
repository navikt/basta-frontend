import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { userLogout } from '../actionCreators'

class Services extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    const { time } = this.state
    const { dispatch, user } = this.props
    if (time > 3600 && user.isUserAuthenticated) {
      dispatch(userLogout())
    }
  }

  render() {
    return null
  }
}

Services.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Services)
