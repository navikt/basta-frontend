const title = 'MQ queue operations'
const description = 'Start, stop or delete'
const image = require('../img/orderTypes/mq.png')
const orderFields = {
  environmentClass: {
    label: 'Environment class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p' }
    ],
    value: 'u'
  },
  // Todo: Fetch from backend
  manager: {
    label: 'Queue manager',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  name: {
    label: 'Name',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
