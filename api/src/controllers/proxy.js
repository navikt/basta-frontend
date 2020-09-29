const proxy = require('http-proxy-middleware')
const token = require('./token')

exports.doProxy = () => {
  return proxy('/rest', {
    target: `${process.env.BASTA_BACKEND}`,
    onProxyReq: restream,
    secure: true,
    changeOrigin: true,
    logLevel: 'info',
    onError: (err, req, res) => {
      console.log('error in proxy', err)
    }
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

exports.attachToken = () => {
  return async (req, res, next) => {
    resource = process.env['BASTA_BACKEND_CLIENT_ID']
    const accessToken = await token.validateRefreshAndGetToken(
      req.session.userid,
      req.session.refreshToken,
      resource
    )
    req.headers['Authorization'] = `Bearer ${accessToken}`
    return next()
  }
}
