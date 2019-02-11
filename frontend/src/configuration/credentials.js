const title = 'AD serviceuser'
const description = 'cleaning service user'
const image = require('../img/orderTypes/security.png')
const orderFields = {
  environmentClass: {
    label: 'Environment Class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Development', value: 'u' },
      { label: 'Test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p', access: ['ROLE_PROD'] }
    ],
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
