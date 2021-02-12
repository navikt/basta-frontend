const request = require('request-promise')
let ms_access_token = ''

exports.getAccessTokenUser = async (tokenURI, refreshToken, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['AZURE_APP_CLIENT_ID'],
      resource: resource, // process.env['AZURE_APP_CLIENT_ID'],
      redirect_uri: process.env['AZURE_APP_CALLBACK_URI'],
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: process.env['AZURE_APP_CLIENT_SECRET']
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
