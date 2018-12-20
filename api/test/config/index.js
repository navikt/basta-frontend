if (process.env['NODE_ENV'] === 'production') {
  exports.host = process.env['HOST'] || 'localhost'
  exports.port = process.env['PORT'] || '8080'
  exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
} else if (process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'offline') {
  exports.host = 'localhost'
  exports.port = 8080
  exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
}
