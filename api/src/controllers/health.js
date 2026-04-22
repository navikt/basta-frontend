const logger = require('morgan')
const prometheus = require('prom-client')

exports.isAlive = () => {
  return (req, res) => {
    res.status(200).end()
  }
}

exports.metrics = () => {
  return (req, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  }
}
