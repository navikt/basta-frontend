const title = 'OpenAM'
const description = 'Server'
const image = require('../img/orderTypes/openam.png')
const orderFields = {
  zone: {
    value: 'sbs'
  },
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  environmentName: {
    label: 'Environment',
    description: '',
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
  orderFields
}
