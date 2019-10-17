const description = 'Application Server'
const title = 'Jboss'
const image = require('../img/orderTypes/jboss.png')
const orderApiPath = '/rest/vm/orders/jboss'
const orderFields = {
  nodeType: {
    value: 'JBOSS'
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
  eapVersion: {
    label: 'EAP version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'EAP 6', value: 'EAP6' }, { label: 'EAP 7', value: 'EAP7' }],
    value: 'EAP6'
  },
  javaVersion: {
    label: 'Java version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'OpenJDK 7', value: 'OpenJDK7' },
      { label: 'OpenJDK 8', value: 'OpenJDK8' }
    ],
    value: 'OpenJDK7'
  },
  classification: {
    label: 'Classification',
    description: 'If you need to do manual config on the server choose custom',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'Standard', value: 'standard' }, { label: 'Custom', value: 'custom' }],
    value: 'standard'
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
