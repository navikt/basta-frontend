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
      client_secret: config.clientSecret,
    }
    const response = await fetch(tokenURI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(parameters).toString(),
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    ms_access_token = data.access_token
    return ms_access_token
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
