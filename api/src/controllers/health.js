const prometheus = require('prom-client')

exports.isAlive = () => {
  return (req, res) => {
    res.status(200).end()
  }
}

exports.metrics = () => {
  return async (req, res, next) => {
    try {
      res.set('Content-Type', prometheus.register.contentType)
      res.end(await prometheus.register.metrics())
    } catch (err) {
      next(err)
    }
  }
}
