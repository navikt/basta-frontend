const title = 'Windows'
const description = 'Server'
const image = require('../img/orderTypes/windows.png')
const orderFields = {
  environmentClass: {
    fieldType: 'environmentClass',
    value: 'u'
  },
  zone: {
    fieldType: 'zone',
    value: 'fss'
  },
  osType: {
    label: 'Operating system',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Windows Server 2012', value: 'win2012' },
      { label: 'Windows Server 2019', value: 'win2019' }
    ],
    value: 'win2019'
  },
  middleWareType: {
    label: 'Server type',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Application (ap)', value: 'windows_ap' },
      { label: 'Information server (is)', value: 'windows_is' }
    ],
    value: 'ap'
  },
  serverCount: {
    label: 'Servers',
    description: 'Virtual Servers',
    fieldType: 'number',
    min: 1,
    max: 8,
    value: 1
  },
  cpuCount: {
    label: 'Cpu',
    description: 'Virtual sockets',
    fieldType: 'number',
    min: 1,
    max: 4,
    value: 1
  },
  memory: {
    label: 'Memory',
    description: 'GB',
    fieldType: 'number',
    min: 2,
    max: 32,
    value: 4
  },
  extraDisk: {
    label: 'Extra disk',
    description: 'GB',
    fieldType: 'number',
    min: 0,
    max: 100,
    value: 0
  },
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
