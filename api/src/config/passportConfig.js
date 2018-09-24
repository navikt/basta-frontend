exports.clientID = process.env['BASTAAZURECONFIG_CLIENTID']
exports.clientSecret = process.env['BASTAAZURECONFIG_CLIENTSECRET']
exports.responseType = 'code id_token'
exports.responseMode = 'form_post'
exports.redirectUrl = process.env['BASTAAZURECONFIG_CALLBACKURI']
exports.passReqToCallback = true
exports.scope = 'profile offline_access user.read'
exports.validateIssuer = true
exports.resourceURL = 'https://graph.microsoft.com'

if (process.env['NODE_ENV'] === 'production') {
  exports.identityMetadata =
    'https://login.microsoftonline.com/navno.onmicrosoft.com/.well-known/openid-configuration'
  exports.tokenURI = `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/token`
  exports.allowHttpForRedirectUrl = false
  exports.loggingLevel = 'error'
} else if (process.env['NODE_ENV'] === 'development') {
  exports.identityMetadata =
    'https://login.microsoftonline.com/navq.onmicrosoft.com/.well-known/openid-configuration'
  exports.tokenURI = `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/token`
  exports.allowHttpForRedirectUrl = true
  exports.loggingLevel = 'error'
}