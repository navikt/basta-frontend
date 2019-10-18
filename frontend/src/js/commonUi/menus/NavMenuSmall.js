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
              History &nbsp;
              <i className="fa fa-history" />
            </Link>
          </li>
          <li onClick={() => this.props.dispatch(closeNavMenu())}>
            <Link to={'/operate'}>
              Operate &nbsp;
              <i className="fa fa-wrench" />
            </Link>
          </li>
          <li onClick={() => this.props.dispatch(closeNavMenu())}>
            <Link to={'/create'}>
              Create &nbsp;
              <i className="fa fa-plus" />
            </Link>
          </li>
          <li>
            User &nbsp;
            <i className="fa fa-user" />
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
