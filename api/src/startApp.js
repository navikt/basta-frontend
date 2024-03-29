const { host, port } = require('./config/config')

const startServer = app => {
  console.log(`Starting Basta backend in ${process.env['NODE_ENV']} ...`)
  app.listen(port, () => {
    console.log(`SERVER HOSTNAME:         ${host}`)
    console.log(`PORT:                    ${port}`)
  })
}

exports.startApp = app => {
  try {
    startServer(app)
  } catch (err) {
    throw new Error('Error starting express server:', err)
  }
}
