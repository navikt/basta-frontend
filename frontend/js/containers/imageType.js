const wasImage = require('../../img/orderTypes/websphere.png')
const wildflyImage = require('../../img/orderTypes/wildfly.png')
const securityImage = require('../../img/orderTypes/security.png')
const openamImage = require('../../img/orderTypes/openam.png')
const redhatImage = require('../../img/orderTypes/redhat.png')
const dbImage = require('../../img/orderTypes/oracle.png')
const windowsImage = require('../../img/orderTypes/windows.png')
const bigipImage = require('../../img/orderTypes/big-ip.png')
const mqImage = require('../../img/orderTypes/mq.png')
const developertoolsImage = require('../../img/orderTypes/devtools.png')
const coreosImage = require('../../img/orderTypes/containerlinux.png')
const flatcarImage = require('../../img/orderTypes/flatcarlinux.png')
const unknown = require('../../img/basta.png')

export default function imageType(orderDescription) {
  if (!orderDescription) {
    return unknown
  }

  switch (orderDescription.toLowerCase()) {
    case 'openam server':
    case 'openam proxy':
      return openamImage
    case 'was deployment manager':
    case 'was nodes':
    case 'was9 nodes':
      return wasImage
    case 'big-ip config':
      return bigipImage
    case 'wildfly':
      return wildflyImage
    case 'oracle':
      return dbImage
    case 'plain linux':
      return redhatImage
    case 'certificate':
      return securityImage
    case 'dev tools':
    case 'dockerhost':
      return developertoolsImage
    case 'windows internet server':
    case 'windows applicationserver':
      return windowsImage
    case 'queue':
    case 'channel':
      return mqImage
    case 'credential':
      return securityImage
    case 'lightweight linux':
      return coreosImage
    case 'flatcar linux':
      return flatcarImage
    default:
      return unknown
  }
}
