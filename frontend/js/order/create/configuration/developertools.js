const description = 'Order new Devillo server'
const title = 'Developer tools available in Devillo'
const image = require('../../../../img/orderTypes/devtools.png')
const orderApiPath = '/rest/vm/orders/devtools'
const orderFields = {
  nodeType: {
    value: 'DEV_TOOLS'
  },
  environmentClass: {
    value: 'u'
  },
  zone: {
    value: 'fss'
  },
  osType: {
    value: 'rhel80'
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
  Extradisk: {
    label: 'Extra disk',
    description: 'GB',
    fieldType: 'number',
    min: 0,
    max: 100,
    value: 0
  },
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
