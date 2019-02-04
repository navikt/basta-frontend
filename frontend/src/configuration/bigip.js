const description = 'Load Balancer Config'
const title = 'BIG-IP'
const image = require('../img/orderTypes/big-ip.png')
const orderFields = {
  environmentClass: {
    label: 'Environment class',
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
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  },
  application: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  //TODO: Fetch from backend
  virtualserver: {
    label: 'Virtual server',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: 'a'
  },
  matchingTypes: {
    label: 'Matching type',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Context root', value: 'context' },
      { label: 'Hostname', value: 'hostname' }
    ],
    value: 'context'
  },
  contextroots: {
    label: 'Context root(s)',
    description: 'Add context roots',
    fieldType: 'text',
    value: ''
  },
  hostname: {
    label: 'VS hostname / DNS',
    description: 'Hostname of the virutal server',
    fieldType: 'text',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
