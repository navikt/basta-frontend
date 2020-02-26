import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import imageType from '../../containers/imageType'
import moment from 'moment'

const OrderListCard = props => {
  const { order } = props
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
          <div>{formatDisplayName(order.createdByDisplayName, order.createdBy)}</div>
        </div>
        <div className="orderListCardResults"> {orderResults(order.results)}</div>
        <div className="orderListCardCreated">
          <div>{formatTimestamp(order.created)}</div>
        </div>
      </div>
    </Link>
  )
}

const formatTimestamp = number => {
  if (number) {
    return moment(number).format('DD MMM YYYY HH:mm')
  }
}

const formatString = string => {
  if (string) {
    return string
      .toLowerCase()
      .replace('_', ' ')
      .replace(/\b\w/g, firstLetter => {
        return firstLetter.toUpperCase()
      })
  }
}

const formatDisplayName = (displayName, userId) => {
  if (displayName.includes('@')) {
    return displayName.split('@')[0].replace(new RegExp('\\.', 'g'), ' ')
  }
  return `${displayName} ( ${userId} )`
}

const orderOperation = order => {
  const { orderOperation, id } = order

  return <span className="bold">{`${orderOperation} | ${id}`} </span>
}

const orderType = order => {
  const { orderType, orderDescription } = order
  return <span>{`${formatString(orderType)} | ${formatString(orderDescription)}`}</span>
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
    case 'FAILURE':
      return 'orderListCardStatus error'
  }
  return <span> {status}</span>
}

OrderListCard.propTypes = {
  order: PropTypes.object
}

export default OrderListCard
