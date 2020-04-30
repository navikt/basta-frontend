import React, { Component } from 'react'
import PageHeading from '../common/components/PageHeading'
import { connect } from 'react-redux'
import OrderGrid from '../order/OrderGrid'
import OrderCard from '../order/OrderCard'
import { isAvailable } from '../common/utils'

const securityImage = require('../../img/orderTypes/security.png')
const redhatImage = require('../../img/orderTypes/redhat.png')
const mqImage = require('../../img/orderTypes/mq.png')

export class Operate extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <PageHeading icon="fa-wrench" heading="Operations" description="Start, stop and remove" />
        <OrderGrid>
          {orderTypes.map((orderType, i) => {
            const { title, description, image, url, access } = orderType
            return (
              <OrderCard
                key={i}
                label={title}
                description={description}
                image={image}
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
    url: '/operate/nodes'
  },
  {
    title: 'Credentials',
    description: 'Service user in AD',
    image: securityImage,
    url: '/operate/credentials'
  } /*,
  {
    title: 'MQ',
    description: 'channel',
    image: mqImage,
    url: '/operate/mqchannels'
  },*/,
  {
    title: 'MQ',
    description: 'Queue',
    image: mqImage,
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
