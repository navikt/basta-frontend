const description = 'Application Server'
const title = 'Websphere'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
  nodeType: {
    value: 'WAS_NODES'
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    fieldType: 'zone',
    value: 'fss'
  },
  environmentName: {
    fieldType: 'environments',
    value: ''
  },
  applicationMappingName: {
    description: '',
    fieldType: 'applications',
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
    label: 'Extra disk',
    description: 'GB',
    fieldType: 'number',
    min: 0,
    max: 100,
    value: 0
  },
  wasVersion: {
    label: 'WAS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'WAS 8', value: 'WAS8' }, { label: 'WAS 9', value: 'WAS9' }],
    value: 'WAS9'
  },
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
  },
  classification: {
    label: 'Classification',
    description: 'If you need to do manual config on the server choose custom',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'Standard', value: 'standard' }, { label: 'Custom', value: 'custom' }],
    value: 'standard'
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
