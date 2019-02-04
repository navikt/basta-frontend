const description = 'Deployment Manager'
const title = 'BPM'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
  nodeType: {
    value: 'BPM_DEPLOYMENT_MANAGER'
  },
  zone: {
    value: 'fss'
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
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
