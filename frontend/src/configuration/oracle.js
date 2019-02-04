// TODO: Have to add functionality to fetch databasename and fasitalias, as well as a field to retrieve databasetype from OEM
const title = 'Database'
const description = 'Oracle'
const image = require('../img/orderTypes/oracle.png')
const orderFields = {
  nodeType: {
    value: 'DB_ORACLE'
  },
  environmentClass: {
    label: 'Environment class',
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
      { label: 'Selvbetjeningssone', value: 'sbs' }
    ],
    value: 'fss'
  },
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  },
  applicationName: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  databaseName: {
    label: 'Database name',
    fieldType: 'databaseName',
    description: '',
    value: ''
  },
  fasitAlias: {
    label: 'Fasit alias',
    fieldType: 'text',
    description: '',
    value: ''
  },
  selectedTemplate: {
    label: 'Database type',
    fieldType: 'dbTemplates',
    description: 'fetching from OEM...',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
