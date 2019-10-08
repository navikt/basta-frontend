const title = 'Red Hat'
const description = 'Linux'
const image = require('../img/orderTypes/redhat.png')
const orderFields = {
  nodeType: {
    value: 'PLAIN_LINUX'
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    fieldType: 'zone',
    value: 'fss'
  },
  osType: {
    label: 'OS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'RHEL 6.0', value: 'rhel60' }, { label: 'RHEL 7.0', value: 'rhel70' }],
    value: 'rhel70'
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
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
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
  orderFields
}
