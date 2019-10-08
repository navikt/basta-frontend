const title = 'Credential'
const description = 'for service user'
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
  application: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  abacAccess: {
    label: 'ABAC',
    description: 'Adds user to ABAC pdp group in AD',
    fieldType: 'checkBox',
    value: false
  },
  stsAccess: {
    label: 'STS',
    description: 'Gives user access to read from STS',
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
