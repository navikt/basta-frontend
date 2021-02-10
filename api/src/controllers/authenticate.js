const passport = require('passport')
const { logoutURL } = require('../config/passportConfig')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    const concatUrl = params => {
      let string = ''
      Object.keys(params).forEach(e => {
        if (params[e]) string = `${string}/${params[e]}`
      })
      return string.toString()
    }
    req.session.redirectUrl = concatUrl(req.params)
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

exports.authenticateAzureCallback = () => {
  return (req, res, next) => {
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: req.session.redirectUrl || '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

// AUTHENTICATION CHECK

exports.ensureAuthenticated = () => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      resource = process.env['AZURE_APP_CLIENT_ID']
      return next()
    }
    res.redirect('/login')
  }
}

// LOGOUT

exports.logout = () => {
  return (req, res) => {
    try {
      req.logout()
      res.redirect(logoutURL)
      req.session = null
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
      return `ERROR during logout: ${err}`
    }
  }
}
