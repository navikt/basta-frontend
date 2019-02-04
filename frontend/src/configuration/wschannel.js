const description = 'Channel'
const title = 'MQ'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
  class: {
    label: 'Environment class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'utvikling' },
      { label: 'test', value: 'test' },
      { label: 'PreProd', value: 'preprod' },
      { label: 'Production', value: 'prod' }
    ],
    value: 'utvikling'
  },
  env: {
    label: 'Environment',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  encrypted: {
    label: 'TLS',
    description: 'Adds encryption with TLS_RSA_AES_256_CBC_SHA',
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
