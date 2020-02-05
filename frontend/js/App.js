import React, { Component } from 'react'
import { Routes } from './routes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavMenuSmall from './commonUi/menus/NavMenuSmall'
import history from './common/history'
import { withRouter } from 'react-router-dom'
import { initializeApplication, userLogout } from './common/actionCreators'
import { closeNavMenu, toggleNavMenu } from './commonUi/menus/actionCreators'
import { getOrderHistory } from './containers/history/actionCreators'
import NavMenu from './commonUi/menus/NavMenu'
import NavUserMenu from './commonUi/menus/NavUserMenu'
import Login from './commonUi/login/Login'
import moment from 'moment'
import Services from './common/components/Services'
import ActiveNotificationsList from './notifications/ActiveNotificationsList'

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
          500,
          moment('2013-01-01').valueOf(),
          moment()
            .add(1, 'days')
            .startOf('day')
            .valueOf(),
          5000
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
              <div className="navBrand" onClick={() => history.push('/')}>
                <span className="fa-stack fa-2x navLogo">
                  <i className="fa fa-circle fa-stack-2x" />
                  <i className="fa fa-cubes fa-stack-1x fa-inverse" />
                </span>
              </div>
            </div>

            <NavMenu />
            <div className="navMenuRight">
              <NavUserMenu user={user} userLogout={userLogout} dispatch={dispatch} />
            </div>
          </header>

          <nav>
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
            <ActiveNotificationsList className="matsbanan" />
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
