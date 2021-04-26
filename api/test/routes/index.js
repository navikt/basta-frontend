const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
//const order = require('../controllers/order')
const health = require('../controllers/health')
const { api } = require('../config')

// APPLICATION HEALTH

router.get('/isalive', health.isAlive())

router.get('/metrics', health.metrics())

// USER

router.get(`/user/profile`, user.getUserProfile())

router.get(`/user/session`, user.userSessionLookup())

module.exports = router
