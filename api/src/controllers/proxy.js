const { createProxyMiddleware } = require('http-proxy-middleware')

// OBO token cache: key = user access token, value = { oboToken, expiresAt }
const oboCache = new Map()

const exchangeForOboToken = async (userToken) => {
  const cached = oboCache.get(userToken)
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.oboToken
  }

  const params = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    client_id: process.env.AZURE_APP_CLIENT_ID,
    client_secret: process.env.AZURE_APP_CLIENT_SECRET,
    assertion: userToken,
    scope: process.env.BASTA_BACKEND_SCOPE,
    requested_token_use: 'on_behalf_of',
  })

  const response = await fetch(process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(
      '[obo] exchange failed. endpoint:',
      process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
      'scope:',
      process.env.BASTA_BACKEND_SCOPE,
    )
    throw new Error(`OBO exchange failed: ${response.status} ${error}`)
  }

  const data = await response.json()
  const oboToken = data.access_token
  const expiresAt = Date.now() + data.expires_in * 1000

  const payload = JSON.parse(Buffer.from(oboToken.split('.')[1], 'base64').toString())
  console.log(
    '[obo] aud:',
    payload.aud,
    'azp:',
    payload.azp,
    'exp:',
    new Date(payload.exp * 1000).toISOString(),
  )

  oboCache.set(userToken, { oboToken, expiresAt })

  if (oboCache.size > 500) {
    const now = Date.now()
    for (const [k, v] of oboCache.entries()) {
      if (v.expiresAt < now) oboCache.delete(k)
    }
  }

  return oboToken
}

exports.attachToken = () => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next()
    }
    try {
      const userToken = authHeader.slice(7)
      const oboToken = await exchangeForOboToken(userToken)
      req.headers['authorization'] = `Bearer ${oboToken}`
    } catch (err) {
      console.error('[proxy] OBO token exchange failed:', err.message)
      return res.status(502).send('Failed to obtain backend access token')
    }
    next()
  }
}

exports.doProxy = () => {
  return createProxyMiddleware({
    target: `${process.env.BASTA_BACKEND}`,
    secure: true,
    changeOrigin: true,
    logger: console,
    pathRewrite: (path, req) => req.originalUrl,
    on: {
      proxyReq: restream,
      proxyRes: (proxyRes, req) => {
        console.log(`[proxy] ${req.method} ${req.originalUrl} -> ${proxyRes.statusCode}`)
      },
      error: (err, req, res) => {
        console.log('error in proxy', err)
      },
    },
  })
}

const restream = (proxyReq, req, res, options) => {
  if (req.body) {
    let bodyData = JSON.stringify(req.body)
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.write(bodyData)
  }
}
