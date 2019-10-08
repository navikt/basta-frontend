const title = 'AD serviceuser'
const description = 'cleaning service user'
const image = require('../img/orderTypes/security.png')
const orderFields = {
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    label: 'Zone',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Fagsystemsone', value: 'fss' },
      { label: 'iApp', value: 'iapp' },
      { label: 'Selvbetjeningssone', value: 'sbs' }
    ],
    value: 'fss'
  },
  applicationMappingName: {
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
