const title = 'Certificate'
const description = 'for service user'
const image = require('../img/orderTypes/security.png')
const orderFields = {
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    fieldType: 'zone',
    value: 'fss'
  },
  application: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
