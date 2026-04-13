import wasImage from 'url:../../img/orderTypes/websphere.png'
import wildflyImage from 'url:../../img/orderTypes/wildfly.png'
import securityImage from 'url:../../img/orderTypes/security.png'
import openamImage from 'url:../../img/orderTypes/openam.png'
import redhatImage from 'url:../../img/orderTypes/redhat.png'
import flatcarlinuxImage from 'url:../../img/orderTypes/flatcarlinux.png'
import dbImage from 'url:../../img/orderTypes/oracle.png'
import windowsImage from 'url:../../img/orderTypes/windows.png'
import bigipImage from 'url:../../img/orderTypes/big-ip.png'
import mqImage from 'url:../../img/orderTypes/mq.png'
import developertoolsImage from 'url:../../img/orderTypes/devtools.png'

export const orderTypes = [
  {
    title: 'WebSphere MQ',
    description: 'Queue',
    image: mqImage,
    url: '/create/mqqueue',
  },
  {
    title: 'WebSphere MQ',
    description: 'Channel',
    image: mqImage,
    url: '/create/mqchannel',
  },
  {
    title: 'Devillo Tools',
    description: 'Jenkins etc. in Devillo',
    image: developertoolsImage,
    url: '/create/developertools',
  },
  {
    title: 'BIG-IP',
    description: 'Load Balancer Config',
    image: bigipImage,
    url: '/create/bigip',
  },
  {
    title: 'Windows',
    description: 'server',
    image: windowsImage,
    url: '/create/windows',
  },
  {
    title: 'Oracle',
    description: 'database',
    image: dbImage,
    url: '/create/oracle',
    access: ['ROLE_SUPERUSER'],
  },
  {
    title: 'Flatcar Linux',
    description: 'Flatcar',
    image: flatcarlinuxImage,
    url: '/create/flatcarlinux',
  },
  {
    title: 'Red Hat',
    description: 'Linux',
    image: redhatImage,
    url: '/create/redhat',
  },
  {
    title: 'Certificate',
    description: 'for Service user',
    image: securityImage,
    url: '/create/certificate',
  },
  {
    title: 'Credentials',
    description: 'for Service user',
    image: securityImage,
    url: '/create/credential',
  },
  {
    title: 'Custom credentials',
    description: 'free text service users not in Fasit',
    image: securityImage,
    url: '/create/customcredential',
  },
  {
    title: 'AD groups',
    description: 'AD groups for MQ',
    image: securityImage,
    url: '/create/adgroups',
  },
  {
    title: 'Custom AD groups',
    description: 'Custom AD groups for MQ',
    image: securityImage,
    url: '/create/customadgroups',
  },
  {
    title: 'WildFly',
    description: 'Application server',
    image: wildflyImage,
    url: '/create/wildflynode',
    access: ['ROLE_SUPERUSER'],
  },
  {
    title: 'WAS',
    description: 'Node',
    image: wasImage,
    url: '/create/wasnode',
    access: ['ROLE_SUPERUSER'],
  },
  {
    title: 'WAS',
    description: 'Deployment Manager',
    image: wasImage,
    url: '/create/wasdmgr',
    access: ['ROLE_SUPERUSER'],
  },
  {
    title: 'BPM',
    description: 'Node',
    image: wasImage,
    url: '/create/bpmnode',
    access: ['ROLE_SUPERUSER'],
  },
  {
    title: 'BPM',
    description: 'Deployment Manager',
    image: wasImage,
    url: '/create/bpmdmgr',
    access: ['ROLE_SUPERUSER'],
  },
]
