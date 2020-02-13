import React from 'react'
import PropTypes from 'prop-types'

export const OrderFilter = props => {
  const { onChange } = props
  return (
    <div className="orderFilterWrapper">
      <input
        className="orderFilterField"
        type="text"
        name="filter"
        placeholder="Filter.."
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

OrderFilter.propTypes = {
  onChange: PropTypes.func
}

export default OrderFilter
