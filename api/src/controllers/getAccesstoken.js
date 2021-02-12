const request = require('request-promise')
const config = require('../config/passportConfig')
let ms_access_token = ''

exports.getAccessTokenUser = async (tokenURI, refreshToken, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: config.clientID,
      redirect_uri: config.redirectUrl,
      resource: resource,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: config.clientSecret
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
    console.log(e)
    throw new Error(e)
  }
}
