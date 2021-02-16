const wasImage = require('../../img/orderTypes/websphere.png')
const jbossImage = require('../../img/orderTypes/jboss.png')
const wildflyImage = require('../../img/orderTypes/wildfly.png')
const libertyImage = require('../../img/orderTypes/liberty.png')
const securityImage = require('../../img/orderTypes/security.png')
const openamImage = require('../../img/orderTypes/openam.png')
const redhatImage = require('../../img/orderTypes/redhat.png')
const flatcarlinuxImage = require('../../img/orderTypes/flatcarlinux.png')
const dbImage = require('../../img/orderTypes/oracle.png')
const windowsImage = require('../../img/orderTypes/windows.png')
const bigipImage = require('../../img/orderTypes/big-ip.png')
const mqImage = require('../../img/orderTypes/mq.png')
const developertoolsImage = require('../../img/orderTypes/devtools.png')

export const orderTypes = [
  {
    title: 'WebSphere MQ',
    description: 'Queue',
    image: mqImage,
    url: '/create/mqqueue'
  },
  {
    title: 'WebSphere MQ',
    description: 'Channel',
    image: mqImage,
    url: '/create/mqchannel'
  },
  {
    title: 'Devillo Tools',
    description: 'Jenkins etc. in Devillo',
    image: developertoolsImage,
    url: '/create/developertools'
  },
  {
    title: 'BIG-IP',
    description: 'Load Balancer Config',
    image: bigipImage,
    url: '/create/bigip'
  },
  {
    title: 'Windows',
    description: 'server',
    image: windowsImage,
    url: '/create/windows'
  },
  {
    title: 'Oracle',
    description: 'database',
    image: dbImage,
    url: '/create/oracle'
  },
  {
    title: 'Flatcar Linux',
    description: 'Flatcar',
    image: flatcarlinuxImage,
    url: '/create/flatcarlinux'
  },
  {
    title: 'Red Hat',
    description: 'Linux',
    image: redhatImage,
    url: '/create/redhat'
  },
  {
    title: 'Certificate',
    description: 'for Service user',
    image: securityImage,
    url: '/create/certificate'
  },
  {
    title: 'Credentials',
    description: 'for Service user',
    image: securityImage,
    url: '/create/credential'
  },
  {
    title: 'Custom credentials',
    description: 'free text service users not in Fasit',
    image: securityImage,
    url: '/create/customcredential'
  },
  {
    title: 'AD groups',
    description: 'AD groups for special use',
    image: securityImage,
    url: '/create/adgroups'
  },
  {
    title: 'Liberty',
    description: 'Application server',
    image: libertyImage,
    url: '/create/liberty',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WildFly',
    description: 'Application server',
    image: wildflyImage,
    url: '/create/wildflynode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'JBoss',
    description: 'Application server',
    image: jbossImage,
    url: '/create/jbossnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WAS',
    description: 'Node',
    image: wasImage,
    url: '/create/wasnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WAS',
    description: 'Deployment Manager',
    image: wasImage,
    url: '/create/wasdmgr',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'BPM',
    description: 'Node',
    image: wasImage,
    url: '/create/bpmnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'BPM',
    description: 'Deployment Manager',
    image: wasImage,
    url: '/create/bpmdmgr',
    access: ['ROLE_SUPERUSER']
  }
]
