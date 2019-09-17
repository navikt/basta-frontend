'use strict'
const express = require('express')
const router = express.Router()
const logger = require('morgan')
const bodyParser = require('body-parser')
const orderMock = require('./orderMock')
const fasitMock = require('./fasitMock')
const mqMock = require('./mqMock')
const dbMock = require('./dbTemplateMock')
const seraMock = require('./seraMock')
const credentialsMock = require('./credentialsMock')
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
router.post(`/rest/v1/mq/order/channel`, orderMock.postOrder())
router.post(`/rest/v1/mq/order/queue`, orderMock.postOrder())
router.get(`/rest/orders/:id/statuslog`, orderMock.getStatusLog())
router.get(`/rest/v1/fasit/environments`, fasitMock.getEnvironments())
router.get(`/rest/v1/fasit/applications`, fasitMock.getApplications())
router.get(`/rest/v1/fasit/resources`, fasitMock.getResources())
router.get(`/rest/v1/mq/clusters`, mqMock.getClusters())
router.get(`/rest/v1/oracledb/templates`, dbMock.getTemplates())
router.get(`/api/v1/servers`, seraMock.getVmInfo())
router.post(`/rest/vm/operations/decommission`, orderMock.decommission())
router.get(`/rest/operation/serviceuser/credential/user`, credentialsMock.user())
router.get(`/rest/orders/serviceuser/credential/existInAD`, credentialsMock.existInAD())
router.get(`/rest/orders/serviceuser/credential/existInFasit`, credentialsMock.existInFasit())

// /rest/operation/serviceuser/credential/user?application=sera&environmentClass=u&zone=fss

// /rest/orders/serviceuser/credential/existInAD?application=sera&environmentClass=u&zone=fss
//

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
