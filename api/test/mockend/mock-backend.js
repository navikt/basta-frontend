'use strict'
const express = require('express')
const router = express.Router()
const logger = require('morgan')
const bodyParser = require('body-parser')
const orderMock = require('./orderMock')
const fasitMock = require('./fasitMock')
const mqMock = require('./mqMock')
const dbMock = require('./dbTemplateMock')
const notificationsMock = require('./notificationsMock')
const credentialsMock = require('./credentialsMock')
const virtualserversMock = require('./virtualServersMock')
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
router.post(`/rest/v1/mq/order/channel`, orderMock.postOrderWithDelay())
router.post(`/rest/v1/mq/order/queue`, orderMock.postOrderWithDelay())
router.get(`/rest/orders/:id/statuslog`, orderMock.getStatusLog())
router.get(`/rest/v1/fasit/environments`, fasitMock.getEnvironments())
router.get(`/rest/v1/fasit/applications`, fasitMock.getApplications())
router.get(`/rest/v1/fasit/resources`, fasitMock.getResources())
router.get(`/rest/v1/mq/clusters`, mqMock.getClusters())
router.get(`/rest/v1/oracledb/templates`, dbMock.getTemplates())
router.post('/rest/vm/orders/:servertype', orderMock.postOrder())
router.post('/rest/vm/orders/:servertype/dmgr', orderMock.postOrder())
router.post('/rest/v1/bigip', orderMock.postOrderWithDelay())
router.post('/rest/v1/oracledb', orderMock.postOrder())
router.post('/rest/orders/serviceuser/certificate', orderMock.postOrder())
router.get('/rest/orders/serviceuser/certificate/existInFasit', credentialsMock.existInFasit())
router.post('/rest/orders/serviceuser/credential', orderMock.postOrder())
router.post('/rest/orders/serviceuser/customcredential', orderMock.postOrder())
router.post(`/rest/vm/operations/decommission`, orderMock.decommission())
router.post(`/rest/operation/serviceuser/credential/delete`, orderMock.decommission())
router.get(`/rest/operation/serviceuser/credential/user`, credentialsMock.user())
router.get(`/rest/orders/serviceuser/credential/existInAD`, credentialsMock.existInAD())
router.get(`/rest/orders/serviceuser/credential/existInFasit`, credentialsMock.existInFasit())
router.get(`/rest/orders/serviceuser/customcredential/existInAD`, credentialsMock.existInAD())
router.get('/rest/v1/bigip/virtualservers', virtualserversMock.getVirtualServers())
router.get('/rest/system/notifications/active', notificationsMock.getActiveNotifications())
router.post('/rest/system/notifications/create', notificationsMock.postNotification())
router.put('/rest/system/notifications/:id/inactive', notificationsMock.removeNotification())

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  console.log(err)

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
