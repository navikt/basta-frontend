import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../../../common/components/formComponents/OrderStatusBadge'

const wasImage = require('../../../../img/orderTypes/websphere.png')
const jbossImage = require('../../../../img/orderTypes/jboss.png')
const wildflyImage = require('../../../../img/orderTypes/wildfly.png')
const libertyImage = require('../../../../img/orderTypes/liberty.png')
const securityImage = require('../../../../img/orderTypes/security.png')
const openamImage = require('../../../../img/orderTypes/openam.png')
const redhatImage = require('../../../../img/orderTypes/redhat.png')
const dbImage = require('../../../../img/orderTypes/oracle.png')
const windowsImage = require('../../../../img/orderTypes/windows.png')
const bigipImage = require('../../../../img/orderTypes/big-ip.png')
const mqImage = require('../../../../img/orderTypes/mq.png')
const developertoolsImage = require('../../../../img/orderTypes/devtools.png')
const iappImage = require('../../../../img/orderTypes/devtools-iapp.png')
const coreosImage = require('../../../../img/orderTypes/containerlinux.png')
const unknown = require('../../../../img/basta.png')

function imageType(orderDescription) {
  switch (orderDescription.toLowerCase()) {
    case 'liberty nodes':
      return libertyImage
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
    case 'jboss':
      return jbossImage
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
    case 'topic':
    case 'queue':
    case 'channel':
      return mqImage
    case 'credential':
      return securityImage
    case 'lightweight linux':
      return coreosImage
    default:
      return unknown
  }
}

const OrderCard = props => {
  const { order } = props
  if (!order) return null
  const image = imageType(order.orderDescription)
  return (
    <Link to={`/orders/${order.id}`}>
      <div className="orderListCard">
        <div className={orderListCardStatus(order.status)} />
        <div className="orderImage orderListImage">
          <img src={image} />
        </div>
        <div className="orderListCardName">
          <div>{orderOperation(order)}</div>
          <div>{orderType(order)}</div>
        </div>
        <div className="orderListCardResults"> {orderResults(order.results)}</div>
        <div className="orderListCardCreated">
          <div>{order.created}</div>
          <div>{formatDisplayName(order.createdByDisplayName, order.createdBy)}</div>
        </div>
      </div>
    </Link>
  )
}

const formatDisplayName = (displayName, userId) => {
  if (displayName.includes('@')) {
    return displayName.substring(0, displayName.indexOf('@')).replace(new RegExp('\\.', 'g'), ' ')
  }
  return `${displayName} ( ${userId} )`
}

const orderOperation = order => {
  const { orderOperation, id } = order

  return <span className="bold">{`${orderOperation} | ${id}`} </span>
}

const orderType = order => {
  const { orderType, orderDescription, id } = order
  return <span>{`${orderType} | ${orderDescription}`}</span>
}

const orderResults = results => {
  return results.map((e, i) => {
    return (
      <div key={i}>
        {e} <br />
      </div>
    )
  })
}

const orderListCardStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return 'orderListCardStatus success'
    case 'WARNING':
      return 'orderListCardStatus warning'
    case 'PROCESSING':
      return 'orderListCardStatus processing'
    case 'ERROR':
      return 'orderListCardStatus error'
  }
  return <span> {status}</span>
}

OrderCard.propTypes = {
  order: PropTypes.object
}

export default OrderCard
