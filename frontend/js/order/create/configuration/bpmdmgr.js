const description = 'Deployment Manager'
const title = 'BPM'
const image = require('../../../../img/orderTypes/websphere.png')
const orderApiPath = '/rest/vm/orders/bpm/dmgr'

const orderFields = {
  nodeType: {
    value: 'BPM86_DEPLOYMENT_MANAGER'
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
    fieldType: 'environmentClass',
    value: 'u'
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
      { label: 'RHEL 7', value: 'rhel70' },
      { label: 'RHEL 8', value: 'rhel80' }
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
