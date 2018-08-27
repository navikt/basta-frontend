const description = 'Channel'
const title = 'MQ'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
    class: {
        label: 'Env. class',
        description: '',
        fieldType: 'buttonGroup',
        alternatives: [{label:'development', value:'utvikling'}, {label:'test', value:'test'}, {label:'PreProd', value:'preprod'}, {label:'Production', value:'prod'}],
        default: 'utvikling'
    },
    env: {
        label: 'Environment',
        description: '',
        fieldType: 'dropDown',
        alternatives: ['a', 'b', 'c', 'd', 'e'],
        default: ''
    },
    encrypted: {
        label: 'TLS',
        description: 'Adds encryption with TLS_RSA_AES_256_CBC_SHA',
        fieldType: 'checkBox',
        default: false
    }
}
module.exports = {
    description,
    title,
    image,
    orderFields
}