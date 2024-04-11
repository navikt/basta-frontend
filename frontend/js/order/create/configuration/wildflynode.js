const description = 'Application Server'
const title = 'Wildfly'
const image = require('../../../../img/orderTypes/wildfly.png')
const orderApiPath = '/rest/vm/orders/wildfly'
const orderFields = {
  nodeType: {
    value: 'WILDFLY'
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
  wildflyVersion: {
    label: 'Wildfly version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Wildfly 17', value: 'wildfly17' },
      { label: 'Wildfly 19', value: 'wildfly19' },
      { label: 'Wildfly 21', value: 'wildfly21' }
    ],
    value: 'wildfly21'
  },
  javaVersion: {
    label: 'Java version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'OpenJDK 8', value: 'OpenJDK8' },
      { label: 'OpenJDK 11', value: 'OpenJDK11' }
    ],
    value: 'OpenJDK11'
  },
  osType: {
    label: 'OS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'RHEL 8', value: 'rhel80' }],
    value: 'rhel80'
  },
  classification: {
    label: 'Classification',
    description: 'If you need to do manual config on the server choose custom',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Standard', value: 'standard' },
      { label: 'Custom', value: 'custom' }
    ],
    value: 'standard'
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
