const { createProxyMiddleware } = require('http-proxy-middleware')

exports.doProxy = () => {
  return createProxyMiddleware('/rest', {
    target: `${process.env.BASTA_BACKEND}`,
    onProxyReq: restream,
    secure: true,
    changeOrigin: true,
    logLevel: 'info',
    pathRewrite: (path) => `${path}`,
    onError: (err, req, res) => {
      console.log('error in proxy', err)
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
