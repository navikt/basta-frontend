const passport = require('passport')
const { logoutURL } = require('../config/passportConfig')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    console.log('[authenticate] /login hit, params:', req.params)
    const concatUrl = (params) => {
      let string = ''
      Object.keys(params).forEach((e) => {
        if (params[e]) string = `${string}/${params[e]}`
      })
      return string.toString()
    }
    req.session.redirectUrl = concatUrl(req.params)
    try {
      console.log('[authenticate] calling passport.authenticate oidc')
      passport.authenticate('oidc', {
        response: res,
        successRedirect: '/',
        failureRedirect: '/error',
      })(req, res, next)
    } catch (err) {
      console.error('[authenticate] caught error:', err)
      throw `ERROR during authentication: ${err}`
    }
  }
}

exports.authenticateAzureCallback = () => {
  return (req, res, next) => {
    console.log('[authenticate] callback hit')
    try {
      passport.authenticate('oidc', {
        response: res,
        successRedirect: req.session.redirectUrl || '/',
        failureRedirect: '/error',
      })(req, res, next)
    } catch (err) {
      console.error('[authenticate] callback caught error:', err)
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
      res.status(500).send('Error during logout')
      return `ERROR during logout: ${err}`
    }
  }
}
