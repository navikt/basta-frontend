const title = 'OpenAM'
const description = 'Server'
const image = require('../img/orderTypes/openam.png')
const orderApiPath = '/rest/vm/orders/openam/server'
const orderFields = {
  zone: {
    value: 'sbs'
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  environmentName: {
    fieldType: 'environments',
    value: ''
  },
  serverCount: {
    label: 'Servers',
    description: 'Virtual Servers',
    fieldType: 'number',
    min: 1,
    max: 8,
    value: 1
  }
}
module.exports = {
  description,
  title,
  image,
  orderApiPath,
  orderFields
}
