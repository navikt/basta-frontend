import React, { Component } from 'react'
import PageHeading from '../common/components/PageHeading'
import { connect } from 'react-redux'
import OrderGrid from '../order/OrderGrid'
import OrderCard from '../order/OrderCard'
import OrderFilter from '../order/OrderFilter'
import { isAvailable } from '../common/utils'

const securityImage = require('../../img/orderTypes/security.png')
const redhatImage = require('../../img/orderTypes/redhat.png')
const mqImage = require('../../img/orderTypes/mq.png')

export class Operate extends Component {
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
        <PageHeading icon="fa-wrench" heading="Operations" description="Start, stop and remove" />
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
    title: 'Nodes',
    description: 'Virtual machines',
    image: redhatImage,
    tags: ['node', 'server', 'start', 'stop', 'delete'],
    url: '/operate/nodes'
  },
  {
    title: 'Credentials',
    description: 'Service user in AD',
    image: securityImage,
    tags: ['ad', 'service', 'user'],
    url: '/operate/credentials'
  },
  {
    title: 'MQ',
    description: 'channel',
    image: mqImage,
    tags: ['mq', 'channel', 'websphere', 'ibm'],
    url: '/operate/mqchannels'
  },
  {
    title: 'MQ',
    description: 'Queue',
    image: mqImage,
    tags: ['mq', 'queue', 'websphere', 'ibm'],
    url: '/operate/mqqueues'
  }
]
Operate.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Operate)
