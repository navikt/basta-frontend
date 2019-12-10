const title = 'MQ channel operations'
const description = 'Start, stop or delete'
const image = require('../../../../img/orderTypes/mq.png')
const orderFields = {
  environmentClass: {
    fieldType: 'environmentClass',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p' }
    ],
    value: 'u'
  },
  manager: {
    label: 'Queue manager',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  topic: {
    label: 'Channel',
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
