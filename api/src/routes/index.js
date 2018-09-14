const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const order = require('../controllers/order')
const user = require('../controllers/user')
const health = require('../controllers/health')
const selftest = require('../controllers/selftest')
const token = require('../controllers/getAccesstoken')
const { api } = require('../config/config')

// APPLICATION HEALTH

router.get('/isalive', health.isAlive())

router.get('/selftest', health.selftest())

router.get('/metrics', health.metrics())

// AUTHENTICATION

router.get('/login/:param1?/:param2?/:param3?', auth.authenticateAzure())

// router.get('/login/*?', auth.authenticateAzure())

// router.get(`/login/*`, auth.authenticateAzureWithRedirect())

router.post('/auth/openid/callback', auth.authenticateAzureCallback())

router.get(`${api}/auth/logout`, auth.logout())

// USER

router.get(`${api}/user/profile`, auth.ensureAuthenticated(), user.getUserProfile())

router.get(`${api}/user/session`, auth.ensureAuthenticated(), user.userSessionLookup())

router.get(`/token`, auth.ensureAuthenticated(), token.getToken())

router.get(`/tokenuser`, auth.ensureAuthenticated(), token.getTokenUser())

// ORDERS

router.get(
  `${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`,
  auth.ensureAuthenticated(),
  order.getOrders()
)

router.get(`${api}/orders/:id/`, auth.ensureAuthenticated(), order.getOrder())

router.post(`${api}/orders/:type/`, auth.ensureAuthenticated(), order.postOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, auth.ensureAuthenticated(), order.getStatusLog())

module.exports = router
