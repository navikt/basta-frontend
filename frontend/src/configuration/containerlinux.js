const title = 'Container Linux'
const description = 'CoreOS'
const image = require('../img/orderTypes/containerlinux.png')
const orderApiPath = '/rest/vm/orders/containerlinux'

const orderFields = {
  nodeType: {
    value: 'LIGHTWEIGHT_LINUX'
  },
  osType: {
    value: 'coreos'
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    fieldType: 'buttonGroup',
    fieldType: 'zone',
    value: 'fss'
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
    value: 1
  },
  memory: {
    label: 'Memory',
    description: 'GB',
    fieldType: 'number',
    min: 2,
    max: 32,
    value: 2
  },
  extraDisk: {
    label: 'Disk til lagrings-node',
    description: 'GB',
    fieldType: 'number',
    min: 0,
    max: 400,
    value: 0
  },
  ibmSw: {
    label: 'IBM',
    description: 'Will install ILMT agent',
    fieldType: 'checkBox',
    value: false
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
