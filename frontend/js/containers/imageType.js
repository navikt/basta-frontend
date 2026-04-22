import wasImage from 'url:../../img/orderTypes/websphere.png'
import wildflyImage from 'url:../../img/orderTypes/wildfly.png'
import securityImage from 'url:../../img/orderTypes/security.png'
import openamImage from 'url:../../img/orderTypes/openam.png'
import redhatImage from 'url:../../img/orderTypes/redhat.png'
import dbImage from 'url:../../img/orderTypes/oracle.png'
import windowsImage from 'url:../../img/orderTypes/windows.png'
import bigipImage from 'url:../../img/orderTypes/big-ip.png'
import mqImage from 'url:../../img/orderTypes/mq.png'
import developertoolsImage from 'url:../../img/orderTypes/devtools.png'
import coreosImage from 'url:../../img/orderTypes/containerlinux.png'
import flatcarImage from 'url:../../img/orderTypes/flatcarlinux.png'
import unknown from 'url:../../img/basta.png'

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
