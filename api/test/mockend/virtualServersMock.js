const virtualServers = require('../mockdata/virtual_servers.json')

exports.getVirtualServers = () => {
  return (req, res) => {
    res.status(200).json(virtualServers)
    //res.status(500).send('No no no no')
  }
}
