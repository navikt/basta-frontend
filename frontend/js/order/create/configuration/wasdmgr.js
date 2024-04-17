const description = 'Deployment Manager'
const title = 'Websphere'
const image = require('../../../../img/orderTypes/websphere.png')
const orderApiPath = '/rest/vm/orders/was/dmgr'
const orderFields = {
  nodeType: {
    value: 'WAS9_DEPLOYMENT_MANAGER'
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
  osType: {
    label: 'OS version',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'RHEL 8', value: 'rhel80' },
      { label: 'RHEL 7', value: 'rhel70' }
    ],
    value: 'rhel80'
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
