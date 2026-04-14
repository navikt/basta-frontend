const { Issuer, Strategy } = require('openid-client')
const { identityMetadata, clientID, clientSecret, redirectUrl, scope } = require('./passportConfig')
const getroles = require('../controllers/getroles')
const finduser = require('./findUser')

let clientPromise = null

function getClient() {
  if (!clientPromise) {
    console.log('[passport] Starting OIDC discovery for:', identityMetadata)
    clientPromise = Issuer.discover(identityMetadata)
      .then((issuer) => {
        console.log('[passport] OIDC discovery successful, issuer:', issuer.issuer)
        return new issuer.Client({
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uris: [redirectUrl],
          response_types: ['code'],
        })
      })
      .catch((err) => {
        console.error('[passport] OIDC discovery FAILED:', err.message)
        clientPromise = null
        throw err
      })
  }
  return clientPromise
}

const verifyCallback = (req, tokenset, userinfo, done) => {
  console.log('[passport] verifyCallback called, userinfo.oid:', userinfo.oid)
  const claims = tokenset.claims()
  const oid = userinfo.oid || claims.oid
  if (!oid) {
    console.error('[passport] No oid found in tokenset claims or userinfo')
    return done(new Error('No oid found'), null)
  }
  process.nextTick(() => {
    finduser.findByOid(oid, function (err, user) {
      if (err) {
        console.log('[passport] findByOid error:', err)
        return done(err)
      }
      if (!user) {
        console.log('[passport] New user, creating session for oid:', oid)
        const arrRoles = getroles.matchRoles(claims.groups || userinfo.groups || [])
        const newUser = {
          oid,
          upn: userinfo.preferred_username,
          displayName: userinfo.name,
          roles: arrRoles,
          refreshToken: tokenset.refresh_token,
        }
        finduser.users.push(newUser)

        req.session.userid = oid
        req.session.upn = userinfo.preferred_username
        req.session.displayName = userinfo.name
        req.session.roles = arrRoles
        req.session.refreshToken = tokenset.refresh_token
        return done(null, newUser)
      }

      console.log('[passport] Existing user found for oid:', oid)
      req.session.userid = user.oid
      req.session.upn = user.upn
      req.session.firstName = user.firstName
      req.session.lastName = user.lastName
      req.session.displayName = user.displayName
      req.session.roles = user.roles
      req.session.refreshToken = tokenset.refresh_token
      return done(null, user)
    })
  })
}

module.exports = (passport) => {
  if (!identityMetadata) {
    console.warn('[passport] AZURE_APP_WELL_KNOWN_URL not set — passport OIDC strategy skipped')
    return
  }

  console.log('[passport] Registering serialize/deserialize and oidc strategy')

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    finduser.findByOid(oid, function (err, user) {
      done(err, user)
    })
  })

  passport.use('oidc', {
    authenticate(req, options) {
      console.log('[passport] authenticate called for oidc strategy')
      const self = this
      getClient()
        .then((client) => {
          console.log('[passport] client ready, delegating to openid-client Strategy')
          const strategy = new Strategy(
            { client, params: { scope }, passReqToCallback: true },
            verifyCallback,
          )
          strategy.success = self.success.bind(self)
          strategy.fail = self.fail.bind(self)
          strategy.redirect = self.redirect.bind(self)
          strategy.error = self.error.bind(self)
          strategy.pass = self.pass.bind(self)
          strategy.authenticate(req, options)
        })
        .catch((err) => {
          console.error('[passport] getClient failed during authenticate:', err.message)
          self.error(err)
        })
    },
  })
}
