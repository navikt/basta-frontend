import React from 'react'
import propTypes from 'prop-types'

export const HistoryFilter = props => {
  const { handleSubmit, handleChange } = props
  return (
    <div className="orderFilterWrapper">
      <form onSubmit={handleSubmit}>
        <input
          className="orderFilterField"
          type="text"
          onChange={handleChange}
          placeholder="Filter..."
        />
        <div className="orderFilterSubmitBtn" onClick={handleSubmit}>
          Filter orders
        </div>
      </form>
    </div>
  )
}

HistoryFilter.propTypes = {
  handleSubmit: propTypes.func,
  handleChange: propTypes.func
}

export default HistoryFilter
