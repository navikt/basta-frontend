const { host, mongoDb, port, api } = require('./config/config')
const mongoose = require('mongoose')

const startServer = app => {
  console.log(`Starting Basta backend in ${process.env['NODE_ENV']} ...`)
  app.listen(port, () => {
    console.log(`SERVER HOSTNAME:         ${host}`)
    console.log(`PORT:                    ${port}`)
    console.log(`API VERSION:             ${api}`)
  })
}

exports.startApp = app => {
  try {
    startServer(app)
    //connectMongoDb()
  } catch (err) {
    throw new Error('Error starting express server:', err)
  }
}
