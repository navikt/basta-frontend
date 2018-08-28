'use strict'
const { host, sessionSecret } = require('./config/config')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const router = require('./routes/routes')
require('./config/passport')(passport)
const { startApp } = require('./startApp')
const auth = require('./controllers/authenticate')

const app = express()
app.use(logger('dev'))

// CORS

const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host, 'login.microsoftonline.com')
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
    secret: sessionSecret,
    cookie: { maxAge: 300 * 1000 },
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      clear_interval: '300'
    })
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ROUTES

app.use('/', router)
app.use(express.static('./dist'))
app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.sendFile('index.html', { root: './dist' })
  }
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
