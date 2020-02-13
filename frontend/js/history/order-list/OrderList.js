import React from 'react'
import PropTypes from 'prop-types'
import OrderListCard from './OrderListCard'
import Spinner from '../../common/components/Spinner'

const OrderList = props => {
  const { orderHistory } = props
  if (orderHistory.length === 0) {
    return <Spinner />
  }
  return <div className="orderListContainer">{renderList(orderHistory)}</div>
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
