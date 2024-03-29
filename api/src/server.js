'use strict'

const { host, sessionSecret, cookieDomain } = require('./config/config')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('cookie-session')
const router = require('./routes/index')
const prometheus = require('prom-client')
const helmet = require('helmet')
require('./config/passport')(passport)
const { startApp } = require('./startApp')

const proxy = require('./controllers/proxy')
const token = require('./controllers/token')
const auth = require('./controllers/authenticate')

prometheus.collectDefaultMetrics()

const app = express()

app.use(
  logger('dev', {
    skip: function(req, res) {
      return res.statusCode < 400
    }
  })
)

// HELMET
app.use(helmet())

// CORS
const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}
app.use(cors)

// SESSION

app.use(bodyParser.json())
app.use(cookieParser(sessionSecret))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)

app.use(
  session({
    name: 'basta',
    keys: [`${process.env['BASTACOOKIE_KEY1']}`, `${process.env['BASTACOOKIE_KEY2']}`],
    maxAge: 24 * 60 * 60 * 1000, // 24 timer
    domain: cookieDomain,
    sameSite: 'lax'
  })
)
app.use(passport.initialize())
app.use(passport.session())

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

// STARTUP
startApp(app)

module.exports = app
