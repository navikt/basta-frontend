import React from 'react'
import PropTypes from 'prop-types'
import OrderListCard from './OrderListCard'
import Spinner from '../../common/components/Spinner'

const OrderList = props => {
  const { orderHistory, orderHistoryReceived } = props

  if (orderHistoryReceived) {
    return <div className="orderListContainer">{renderList(orderHistory)}</div>
  } else {
    return <Spinner />
  }
}

const renderList = orders => {
  let orderList = []
  if (orders.length > -1) {
    orders.forEach((e, i) => {
      orderList.push(
        <div key={i}>
          <OrderListCard order={e} />
        </div>
      )
    })
  }
  return orderList
}

OrderList.propTypes = {
  orderHistory: PropTypes.array
}

export default OrderList
