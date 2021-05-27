import { logPageView } from '../../../amplitude'

const description = 'Application Server'
const title = 'Liberty '
const image = require('../../../../img/orderTypes/liberty.png')
const orderApiPath = '/rest/vm/orders/liberty'
const orderFields = {
  nodeType: {
    value: 'LIBERTY'
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
  osType: {
    label: 'OS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'RHEL 7', value: 'rhel70' },
      { label: 'RHEL 8', value: 'rhel80' }
    ],
    value: 'rhel70'
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

logPageView('/create/liberty')

module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
