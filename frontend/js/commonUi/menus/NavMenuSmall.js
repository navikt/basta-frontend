import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { closeNavMenu } from './actionCreators'

export class NavMenuSmall extends Component {
  render() {
    if (!this.props.navMenu.visible) return null
    return (
      <div className="navMenuSmall">
        <ul>
          <li onClick={() => this.props.dispatch(closeNavMenu())}>
            <Link to={'/'}>
              <i className="fa fa-history" />
              &nbsp; History
            </Link>
          </li>
          <li onClick={() => this.props.dispatch(closeNavMenu())}>
            <Link to={'/operate'}>
              <i className="fa fa-wrench" />
              &nbsp; Operate
            </Link>
          </li>
          <li onClick={() => this.props.dispatch(closeNavMenu())}>
            <Link to={'/create'}>
              <i className="fa fa-plus" />
              &nbsp; Create
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

NavMenuSmall.propTypes = {
  navMenu: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    user: state.user,
    navMenu: state.navMenu
  }
}

export default connect(mapStateToProps)(NavMenuSmall)
