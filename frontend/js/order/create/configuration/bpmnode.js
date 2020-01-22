const description = 'Node'
const title = 'BPM'
const image = require('../../../../img/orderTypes/websphere.png')
const orderApiPath = '/rest/vm/orders/bpm/node'
const orderFields = {
  nodeType: {
    value: 'BPM86_NODES'
  },
  extraDisk: {
    value: 10
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    value: 'fss'
  },
  environmentName: {
    fieldType: 'environments',
    value: ''
  },
  serverCount: {
    label: 'Servers',
    description: 'Virtual Servers',
    fieldType: 'number',
    min: 1,
    max: 8,
    value: 1
  },
  cpuCount: {
    label: 'Cpu',
    description: 'Virtual sockets',
    fieldType: 'number',
    min: 1,
    max: 4,
    value: 4
  },
  memory: {
    label: 'Memory',
    description: 'GB',
    fieldType: 'number',
    min: 2,
    max: 32,
    value: 16
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
