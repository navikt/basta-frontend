const title = 'Red Hat'
const description = 'Linux'
const image = require('../img/orderTypes/redhat.png')
const orderFields = {
  nodeType: {
    value: 'REDHAT'
  },
  classification: {
    value: { type: 'custom' }
  },
  environmentClass: {
    label: 'Env. class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p', access: ['ROLE_PROD'] }
    ],
    value: 'u'
  },
  zone: {
    label: 'Zone',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Fagsystemsone', value: 'fss' },
      { label: 'Selvbetjeningssone', value: 'sbs' }
    ],
    value: 'fss'
  },
  osType: {
    label: 'OS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'RHEL 7.0', value: 'rhel70' }, { label: 'RHEL 8.0', value: 'rhel80' }],
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
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
  },
  ibm: {
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