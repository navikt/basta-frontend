import React from 'react'
import PropTypes from 'prop-types'

export const OrderGrid = props => {
  const { children } = props
  return <div className="orderGrid">{children}</div>
}
OrderGrid.propTypes = {
  children: PropTypes.array
}
export default OrderGrid
