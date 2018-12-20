'use strict'
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./routes/')
const proxy = require('http-proxy-middleware')
const { startApp } = require('./startApp')

const app = express()
app.use(
  logger('dev', {
    skip: function(req, res) {
      return req.url === '/isAlive' || req.url === '/user/session'
    }
  })
)

// CORS
const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}

app.use('/rest', proxy('/rest', { target: `${process.env.BASTA_BACKEND}` }))
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)

// Proxy all API calls to orders to Basta java backend

app.use('/', router)
app.use(express.static('./dist'))
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
