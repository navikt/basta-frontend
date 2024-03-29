const {
  identityMetadata,
  clientID,
  clientSecret,
  responseType,
  responseMode,
  redirectUrl,
  passReqToCallback,
  scope,
  allowHttpForRedirectUrl,
  validateIssuer,
  loggingLevel,
  cookieEncryptionKeys,
  useCookieInsteadOfSession,
  nonceLifetime
} = require('./passportConfig')
const getroles = require('../controllers/getroles')
const finduser = require('./findUser')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const token = require('../controllers/token')
let arrRoles = ''
let tokenExpire = ''

module.exports = passport => {
  // (DE)SERIALIZE USER

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    finduser.findByOid(oid, function(err, user) {
      done(err, user)
    })
  })

  // AZURE AD LOGIN STRATEGY

  passport.use(
    'azuread-openidconnect',
    new OIDCStrategy(
      {
        identityMetadata: identityMetadata,
        clientID: clientID,
        clientSecret: clientSecret,
        responseType: responseType,
        responseMode: responseMode,
        redirectUrl: redirectUrl,
        passReqToCallback: passReqToCallback,
        scope: scope,
        allowHttpForRedirectUrl: allowHttpForRedirectUrl,
        validateIssuer: validateIssuer,
        loggingLevel: loggingLevel,
        cookieEncryptionKeys: cookieEncryptionKeys,
        useCookieInsteadOfSession: useCookieInsteadOfSession,
        nonceLifetime: nonceLifetime
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        if (!profile.oid) {
          return done(new Error('No oid found'), null)
        }
        process.nextTick(() => {
          finduser.findByOid(profile.oid, function(err, user) {
            if (err) {
              console.log('error: ', err)
              return done(err)
            }
            if (!user) {
              arrRoles = getroles.matchRoles(profile._json.groups)
              let newUser = {}
              newUser.oid = profile.oid
              newUser.upn = profile._json.preferred_username
              newUser.displayName = profile.displayName
              newUser.roles = arrRoles
              newUser.refreshToken = refreshToken
              finduser.users.push(newUser)

              req.session.userid = profile.oid
              req.session.upn = profile._json.preferred_username
              req.session.displayName = profile.displayName
              req.session.roles = arrRoles
              req.session.refreshToken = refreshToken
              return done(null, newUser)
            }

            req.session.userid = user.oid
            req.session.upn = user.upn
            req.session.firstName = user.firstName
            req.session.lastName = user.lastName
            req.session.displayName = user.displayName
            req.session.roles = user.roles
            req.session.refreshToken = refreshToken
            return done(null, user)
          })
        })
      }
    )
  )
}
