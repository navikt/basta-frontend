const description = 'Deployment Manager'
const title = 'Websphere'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
  nodeType: {
    value: 'WAS_DEPLOYMENT_MANAGER'
  },
  serverCount: {
    value: 1
  },
  cpuCount: {
    value: 2
  },
  memory: {
    value: 4
  },
  extraDisk: {
    value: 10
  },
  environmentClass: {
    label: 'Environment class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Development', value: 'u' },
      { label: 'Test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p' }
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
  wasVersion: {
    label: 'WAS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [{ label: 'WAS 8', value: 'WAS8' }, { label: 'WAS 9', value: 'WAS9' }],
    value: 'WAS9'
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
