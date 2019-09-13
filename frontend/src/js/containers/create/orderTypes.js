const wasImage = require('../../../img/orderTypes/websphere.png')
const jbossImage = require('../../../img/orderTypes/jboss.png')
const wildflyImage = require('../../../img/orderTypes/wildfly.png')
const libertyImage = require('../../../img/orderTypes/liberty.png')
const securityImage = require('../../../img/orderTypes/security.png')
const openamImage = require('../../../img/orderTypes/openam.png')
const redhatImage = require('../../../img/orderTypes/redhat.png')
const containerlinuxImage = require('../../../img/orderTypes/containerlinux.png')
const dbImage = require('../../../img/orderTypes/oracle.png')
const windowsImage = require('../../../img/orderTypes/windows.png')
const bigipImage = require('../../../img/orderTypes/big-ip.png')
const mqImage = require('../../../img/orderTypes/mq.png')
const developertoolsImage = require('../../../img/orderTypes/devtools.png')

export const orderTypes = [
  {
    title: 'WebSphere MQ',
    description: 'Queue',
    image: mqImage,
    tags: ['mq', 'queue', 'websphere', 'ibm'],
    url: '/create/mqqueue'
  },
  {
    title: 'WebSphere MQ',
    description: 'Channel',
    image: mqImage,
    tags: ['mq', 'channel', 'websphere', 'ibm'],
    url: '/create/mqchannel'
  },
  {
    title: 'Devillo Tools',
    description: 'Jenkins etc. in Devillo',
    image: developertoolsImage,
    tags: ['developer', 'tools', 'devillo', 'jenkins'],
    url: '/create/developertools'
  },

  {
    title: 'BIG-IP',
    description: 'Load Balancer Config',
    image: bigipImage,
    tags: ['loadbalancer', 'big-ip', 'f5'],
    url: '/create/bigip'
  },
  {
    title: 'Windows',
    description: 'server',
    image: windowsImage,
    tags: ['server', 'node', 'windows', 'node'],
    url: '/create/windows'
  },
  {
    title: 'Oracle',
    description: 'database',
    image: dbImage,
    tags: ['database', 'db', 'oracle'],
    url: '/create/oracle'
  },
  {
    title: 'Container Linux',
    description: 'CoreOS',
    image: containerlinuxImage,
    tags: ['linux', 'server', 'core os', 'container', 'node'],
    url: '/create/containerlinux'
  },
  {
    title: 'Red Hat',
    description: 'Linux',
    image: redhatImage,
    tags: ['linux', 'server', 'red hat', 'node'],
    url: '/create/redhat'
  },
  {
    title: 'OpenAM',
    description: 'proxy',
    image: openamImage,
    tags: ['openam', 'server', 'security', 'proxy'],
    url: '/create/openamproxy'
  },
  {
    title: 'OpenAM',
    description: 'server',
    image: openamImage,
    tags: ['openam', 'server', 'security'],
    url: '/create/openamserver'
  },
  {
    title: 'Certificate',
    description: 'for Service user',
    image: securityImage,
    tags: ['certificate', 'pki', 'credential', 'ad'],
    url: '/create/certificate'
  },
  {
    title: 'Credentials',
    description: 'for Service user',
    image: securityImage,
    tags: ['service', 'user', 'credential', 'ad'],
    url: '/create/credential'
  },
  {
    title: 'Liberty',
    description: 'Application server',
    image: libertyImage,
    tags: ['server', 'node', 'was', 'liberty', 'application', 'websphere'],
    url: '/create/liberty',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WildFly',
    description: 'Application server',
    image: wildflyImage,
    tags: ['server', 'node', 'wildfly', 'application'],
    url: '/create/wildflynode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'JBoss',
    description: 'Application server',
    image: jbossImage,
    tags: ['server', 'node', 'jboss', 'application'],
    url: '/create/jbossnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WAS',
    description: 'Node',
    image: wasImage,
    tags: ['server', 'node', 'was', 'websphere'],
    url: '/create/wasnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'WAS',
    description: 'Deployment Manager',
    image: wasImage,
    tags: ['server', 'deployment manager', 'was', 'websphere'],
    url: '/create/wasdmgr',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'BPM',
    description: 'Node',
    image: wasImage,
    tags: ['server', 'node', 'was', 'websphere'],
    url: '/create/bpmnode',
    access: ['ROLE_SUPERUSER']
  },
  {
    title: 'BPM',
    description: 'Deployment Manager',
    image: wasImage,
    tags: ['server', 'deployment manager', 'was', 'websphere'],
    url: '/create/bpmdmgr',
    access: ['ROLE_SUPERUSER']
  }
]
