const { Issuer, Strategy } = require('openid-client')
const { identityMetadata, clientID, clientSecret, redirectUrl, scope } = require('./passportConfig')
const getroles = require('../controllers/getroles')
const finduser = require('./findUser')

module.exports = async (passport) => {
  if (!identityMetadata) {
    console.warn('AZURE_APP_WELL_KNOWN_URL not set — passport OIDC strategy skipped')
    return
  }

  // (DE)SERIALIZE USER

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    finduser.findByOid(oid, function (err, user) {
      done(err, user)
    })
  })

  // OIDC STRATEGY VIA OPENID-CLIENT

  const issuer = await Issuer.discover(identityMetadata)
  const client = new issuer.Client({
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uris: [redirectUrl],
    response_types: ['code'],
  })

  passport.use(
    'oidc',
    new Strategy(
      {
        client,
        params: { scope },
        passReqToCallback: true,
      },
      (req, tokenset, userinfo, done) => {
        const claims = tokenset.claims()
        const oid = userinfo.oid || claims.oid
        if (!oid) {
          return done(new Error('No oid found'), null)
        }
        process.nextTick(() => {
          finduser.findByOid(oid, function (err, user) {
            if (err) {
              console.log('error: ', err)
              return done(err)
            }
            if (!user) {
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
      },
    ),
  )
}
