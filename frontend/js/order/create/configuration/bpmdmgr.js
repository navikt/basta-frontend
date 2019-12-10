const description = 'Deployment Manager'
const title = 'BPM'
const image = require('../../../../img/orderTypes/websphere.png')
const orderApiPath = '/rest/vm/orders/bpm/dmgr'

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
    fieldType: 'environmentClass',
    value: 'u'
  },
  environmentName: {
    fieldType: 'environments',
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
