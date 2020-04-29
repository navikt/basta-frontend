const applications = require('../mockdata/applications.json')
const environments = require('../mockdata/environments.json')
const mq_queue_managers = require('../mockdata/mq_queue_managers.json')

exports.getApplications = () => {
  return (req, res) => {
    res.status(200).json(applications)
  }
}

exports.getEnvironments = () => {
  return (req, res) => {
    res.status(200).json(environments)
  }
}

exports.getResources = () => {
  return (req, res) => {
    res.status(200).json(mq_queue_managers)
  }
}
