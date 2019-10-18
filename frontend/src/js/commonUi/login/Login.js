import React from 'react'
//import { host, port } from '../../../../../api/src/config/config'
const bastaLogo = require('../../../img/basta.png')
const navLogo = require('../../../img/nav.png')

const Login = props => {
  const { pathname } = props.location
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-box" >
          <img className="login-nav-logo" src={bastaLogo} />
          <div className="login-box-header">Successfully logged out of Basta</div>
          <div className="login-box-body">
            <center> Ra-authenticate by logging into NAV's single sign-on provider. </center>
          </div>
          <div>
            <a className="login-box-btn" href={`/login${pathname}`}>
              <center> Continue </center>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
