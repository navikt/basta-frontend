const mq_clusters_u = require('../mockdata/mq_clusters_u.json')
const mq_clusters_t = require('../mockdata/mq_clusters_t.json')
const mq_clusters_q = require('../mockdata/mq_clusters_q.json')
const mq_clusters_p = require('../mockdata/mq_clusters_p.json')
const mq_queues = require('../mockdata/mq_queues.json')
const mq_channels = require('../mockdata/mq_channels.json')

exports.getQueues = () => {
  return (req, res) => {
    res.status(200).json(mq_queues)
  }
}

exports.getChannels = () => {
  return (req, res) => {
    res.status(200).json(mq_channels)
  }
}

exports.getClusters = () => {
  return (req, res) => {
    const environmentClass = req.query.environmentClass
    switch (environmentClass) {
      case 'u':
        res.status(200).json(mq_clusters_u)
        break
      case 't':
        res.status(200).json(mq_clusters_t)
        break
      case 'q':
        res.status(200).json(mq_clusters_q)
        break
      case 'p':
        res.status(200).json(mq_clusters_p)
        break
      default:
        res.status(500).send('sheit!')
    }
  }
}
