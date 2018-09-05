const { host, mongoDb, port, api } = require('./config/')

const startServer = app => {
  console.log(
    `Starting Basta backend in offline mode NODE_ENV is set to: ${process.env['NODE_ENV']}`
  )
  app.listen(port, () => {
    console.log(`SERVER HOSTNAME:         ${host}`)
    console.log(`PORT:                    ${port}`)
    console.log(`API VERSION:             ${api}`)
  })
}

exports.startApp = app => {
  try {
    startServer(app)
  } catch (err) {
    throw new Error('Error starting express server:', err)
  }
}
