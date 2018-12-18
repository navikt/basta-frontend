import React, { Component } from 'react'
import { Routes } from '../common/routes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavMenuSmall from './navMenu/NavMenuSmall'
import history from '../common/history'
import { withRouter } from 'react-router-dom'
import { initializeApplication, userLogout } from '../common/actionCreators'
import { closeNavMenu, toggleNavMenu } from './navMenu/actionCreators'
import { getOrderHistory } from './history/actionCreators'
import NavMenu from './navMenu/NavMenu'
import NavUserMenu from './navMenu/NavUserMenu'
import Login from '../containers/login/Login'
import moment from 'moment'
import Services from '../common/components/Services'

const bastaLogo = require('../../img/basta.png')

class App extends Component {
  navigate(location) {
    if (location === 'History') location = '/'
    history.push(location.toLowerCase())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initializeApplication())
    moment.locale('no-nb')
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const { dispatch, user } = this.props
    if (prevProps.user.isUserAuthenticated !== user.isUserAuthenticated && user.isUserAuthenticated)
      dispatch(
        getOrderHistory(
          1000,
          moment('2013-01-01').valueOf(),
          moment()
            .add(1, 'days')
            .startOf('day')
            .valueOf()
        )
      )
  }

  render() {
    const { appReady, user, dispatch } = this.props

    if (appReady) {
      return !user.isUserAuthenticated ? (
        <Login location={location} />
      ) : (
        <div className="wrapper" onClick={() => this.setState({ time: 0 })}>
          <header>
            <div className="navBasta">
              <div className="navBrand" href="/">
                <img className="navLogo" src={bastaLogo} onClick={() => history.push('/')} />
                <div className="navName">basta</div>
              </div>
            </div>
            <div className="navMenuRight">
              <NavUserMenu user={user} userLogout={userLogout} dispatch={dispatch} />
            </div>
          </header>
          <div className="navLeft" />
          <nav>
            <NavMenu className="navTabs" />
            <div className="mobileMenu">
              <NavUserMenu user={user} userLogout={userLogout} dispatch={dispatch} />
              <div className="navButton" onClick={() => this.props.dispatch(toggleNavMenu())}>
                <i className="fa fa-bars fa-2x navSmallButton" />
              </div>
            </div>
          </nav>
          <div className="navRight" />
          <main onClick={() => this.props.dispatch(closeNavMenu())}>
            <Services />
            <NavMenuSmall />
            <Routes />
          </main>
        </div>
      )
    } else {
      return null
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  appReady: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user,
    appReady: state.initialize.appReady
  }
}

export default withRouter(connect(mapStateToProps)(App))
