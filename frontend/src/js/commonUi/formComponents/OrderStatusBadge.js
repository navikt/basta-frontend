import React from 'react'
import propTypes from 'prop-types'

const OrderStatusBadge = props => {
  const { status } = props
  switch (status) {
    case 'SUCCESS':
      return (
        <span className="badge success">
          {' '}
          <i className="fa fa-check" /> {status}
        </span>
      )
    case 'WARNING':
      return (
        <span className="badge warning">
          {' '}
          <i className="fa fa-flag" /> {status}
        </span>
      )
    case 'PROCESSING':
      return (
        <span className="badge info">
          {' '}
          <i className="fa fa-recycle" /> {status}
        </span>
      )
    case 'ERROR':
      return (
        <span className="badge error">
          {' '}
          <i className="fa fa-exclamation-triangle" /> {status}
        </span>
      )
  }
  return <span> {status}</span>
}
OrderStatusBadge.propTypes = {
  status: propTypes.object.isRequired
}

export default OrderStatusBadge
