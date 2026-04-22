'use strict'

const { host } = require('./config/config')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/index')
const prometheus = require('prom-client')
const helmet = require('helmet')
const { startApp } = require('./startApp')

const proxy = require('./controllers/proxy')
const auth = require('./controllers/authenticate')

prometheus.collectDefaultMetrics()

const app = express()

app.use(
  logger('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    },
  }),
)

// HELMET
app.use(helmet({ contentSecurityPolicy: false }))

// CORS
const cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  )
  return next()
}
app.use(cors)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)

// Decode JWT claims from the sidecar-injected Authorization header
app.use((req, res, next) => {
  const authHeader = req.headers['authorization']
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const payload = authHeader.split('.')[1]
      req.user = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
    } catch (_) {}
  }
  next()
})

// ROUTES
app.use('/static', express.static('./dist'))
app.use('/rest/', auth.ensureAuthenticated(), proxy.attachToken(), proxy.doProxy())
app.use('/', router)

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist' })
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})

startApp(app)

module.exports = app
