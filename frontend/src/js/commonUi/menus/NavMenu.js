import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class NavMenu extends Component {
  isActive(context) {
    let { location } = this.props
    if (!location) {
      return context === '' ? 'active' : null
    }
    const path = location.pathname.split('/')[1]
    if (path === context) return 'active'
  }

  render() {
    return (
      <div className="navMenu">
        <ul className="nav nav-tabs">
          <li className={this.isActive('')}>
            <Link to="/">
              <i className="fa fa-history" />
              &nbsp;&nbsp;History
            </Link>
          </li>
          <li className={this.isActive('create')}>
            <Link to="/create">
              <i className="fa fa-plus" />
              &nbsp;&nbsp;Create
            </Link>
          </li>
          <li className={this.isActive('operate')}>
            <Link to="/operate">
              <i className="fa fa-wrench" />
              &nbsp;&nbsp;Operate
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

NavMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object
}

const mapStateToProps = state => ({
  location: state.routing.locationBeforeTransitions
})

export default connect(mapStateToProps)(NavMenu)
