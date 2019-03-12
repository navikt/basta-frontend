const user = require('../mockdata/credentials_info.json')

exports.existInAD = () => {
  return (req, res) => {
    res.status(200).send(Math.random() < 0.5)
  }
}

exports.existInFasit = () => {
  return (req, res) => {
    res.status(200).send(Math.random() < 0.5)
  }
}

exports.user = () => {
  return (req, res) => {
    res.status(200).send(user)
  }
}
