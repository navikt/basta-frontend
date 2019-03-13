import React, { Component } from 'react'
import PageHeading from '../../common/components/PageHeading'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OrderGrid from '../../common/components/OrderGrid'
import OrderCard from '../../common/components/OrderCard'
import OrderFilter from '../../common/components/OrderFilter'
import { isAvailable } from '../../common/utils'

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
const iappImage = require('../../../img/orderTypes/devtools-iapp.png')

export class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderTypes,
      filteredOrders: orderTypes
    }
  }

  filterString(filter) {
    const filteredOrders = this.state.orderTypes.filter(orderType => {
      return (
        orderType.tags.filter(tag => {
          return tag.match(filter)
        }).length > 0
      )
    })
    this.setState({ filteredOrders })
  }

  render() {
    return (
      <div>
        <PageHeading icon="fa-plus" heading="Create new order" description="" />
        <OrderFilter onChange={e => this.filterString(e)} />
        <OrderGrid>
          {this.state.filteredOrders.map((orderType, i) => {
            const { title, description, image, tags, url, access } = orderType
            return (
              <OrderCard
                key={i}
                label={title}
                description={description}
                image={image}
                tags={tags}
                url={url}
                access={access}
                enabled={isAvailable(access, this.props.user.userProfile.roles)}
              />
            )
          })}
        </OrderGrid>
      </div>
    )
  }
}

const orderTypes = [
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
    //    access: ['Random']
  },
  {
    title: 'IApp Tools',
    description: 'Available via VPN',
    image: iappImage,
    tags: ['developer', 'tools', 'iapp', 'jenkins', 'vpn'],
    url: '/create/iapptools'
    //    access: [roles.ROLE_OPERATIONS, roles.ROLE_PROD_OPERATIONS]
  },
  {
    title: 'Devillo Tools',
    description: 'Jenkins etc. in Devillo',
    image: developertoolsImage,
    tags: ['developer', 'tools', 'devillo', 'jenkins'],
    url: '/create/developertools'
    //   access: ['Random']
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
    url: '/create/liberty'
  },
  {
    title: 'WildFly',
    description: 'Application server',
    image: wildflyImage,
    tags: ['server', 'node', 'wildfly', 'application'],
    url: '/create/wildflynode'
  },
  {
    title: 'JBoss',
    description: 'Application server',
    image: jbossImage,
    tags: ['server', 'node', 'jboss', 'application'],
    url: '/create/jbossnode'
  },
  {
    title: 'WAS',
    description: 'Node',
    image: wasImage,
    tags: ['server', 'node', 'was', 'websphere'],
    url: '/create/wasnode'
  },
  {
    title: 'WAS',
    description: 'Deployment Manager',
    image: wasImage,
    tags: ['server', 'deployment manager', 'was', 'websphere'],
    url: '/create/wasdmgr'
  },
  {
    title: 'BPM',
    description: 'Node',
    image: wasImage,
    tags: ['server', 'node', 'was', 'websphere'],
    url: '/create/bpmnode'
  },
  {
    title: 'BPM',
    description: 'Deployment Manager',
    image: wasImage,
    tags: ['server', 'deployment manager', 'was', 'websphere'],
    url: '/create/bpmdmgr'
  }
]
Create.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Create)
