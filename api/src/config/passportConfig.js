exports.clientID = process.env['AZURE_APP_CLIENT_ID']
exports.clientSecret = process.env['AZURE_APP_CLIENT_SECRET']
exports.responseType = 'code'
exports.responseMode = 'query'
exports.redirectUrl = process.env['AZURE_APP_CALLBACK_URI']
exports.identityMetadata = process.env['AZURE_APP_WELL_KNOWN_URL']
exports.tokenURI = process.env['AZURE_TOKEN_URI']
exports.logoutURL = process.env['AZURE_LOGOUT_URL']
exports.passReqToCallback = true
exports.scope = 'profile offline_access'
exports.validateIssuer = true
exports.resourceURL = 'https://graph.microsoft.com'
exports.useCookieInsteadOfSession = true
const key1 = process.env['PASSPORTCOOKIE_KEY1']
const key2 = process.env['PASSPORTCOOKIE_KEY2']
const key3 = process.env['PASSPORTCOOKIE_KEY3']
const key4 = process.env['PASSPORTCOOKIE_KEY4']
const passportkey1 = { key: key1, iv: key3 }
const passportkey2 = { key: key2, iv: key4 }
exports.cookieEncryptionKeys = [passportkey1, passportkey2]
exports.nonceLifetime = 36000

if (process.env['NODE_ENV'] === 'production') {
  exports.allowHttpForRedirectUrl = false
  exports.loggingLevel = 'debug'
} else if (process.env['NODE_ENV'] === 'development') {
  exports.allowHttpForRedirectUrl = true
  exports.loggingLevel = 'debug'
}
