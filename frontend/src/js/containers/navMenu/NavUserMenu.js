import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
const userImage = require('../../../img/default-user.jpeg')

export class NavUserMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMenu: false
    }
  }

  render() {
    const { user, userLogout, dispatch } = this.props
    const { displayMenu } = this.state

    return (
      <div className="navUserMenu" onClick={() => this.setState({ displayMenu: !displayMenu })}>
        <div className="navUserInfo">
          {user.userProfile.firstName} {user.userProfile.lastName}
        </div>
        <div>
          <img className="navUserImage" src={userImage} />
        </div>

        {displayMenu ? (
          <div className="navUserMenu-content">
            <a href="https://account.activedirectory.windowsazure.com/r#/profile">
              {user.userProfile.userName}
            </a>
            <hr />
            <div>
              Access: <br />{' '}
              {user.isUserAuthenticated && user.userProfile.roles ? (
                <ul>
                  {user.userProfile.roles.map(role => {
                    return <li key={role}>{role}</li>
                  })}
                </ul>
              ) : (
                'No roles found for user'
              )}
            </div>
            <hr />
            <a
              className="navUserMenu-signout"
              onClick={() => {
                dispatch(userLogout())
              }}
            >
              <i className="fa fa-sign-out" /> Sign out
            </a>
          </div>
        ) : null}
      </div>
    )
  }
}
NavUserMenu.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(NavUserMenu)
