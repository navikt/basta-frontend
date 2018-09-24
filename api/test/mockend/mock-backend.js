'use strict'
const express = require('express')
const router = express.Router()
const logger = require('morgan')
const bodyParser = require('body-parser')
const orderMock = require('./orderMock')
const fasitMock = require('./fasitMock')
const app = express()
app.use(logger('dev'))

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)
router.get('/rest/orders', orderMock.getAllOrders())
router.get(`/rest/orders/page/:pageId/:pageSize/:toDate/:fromDate`, orderMock.getOrders())
router.get(`/rest/orders/:id/`, orderMock.getOrder())
router.post(`/rest/orders/:type/`, orderMock.postOrder())
router.get(`/rest/orders/:id/statuslog`, orderMock.getStatusLog())
router.get(`/rest/v1/fasit/environments`, fasitMock.getEnvironments())
router.get(`/rest/v1/fasit/applications`, fasitMock.getApplications())

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})

// STARTUP
const host = 'localhost'
const port = 6996
try {
  console.log(`Starting Basta mock backend`)
  app.listen(port, () => {
    console.log(`Done. I am listening on ${host}:${port}`)
  })
} catch (err) {
  throw new Error('Error starting express server:', err)
}

module.exports = app
