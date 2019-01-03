const request = require('request-promise')
let ms_access_token = ''

exports.getAccessTokenUser = async (tokenURI, refreshToken, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: resource, // process.env['BASTAAZURECONFIG_CLIENTID'],
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token
    })
    return ms_access_token
  } catch (e) {
    throw new Error(e)
  }
}
