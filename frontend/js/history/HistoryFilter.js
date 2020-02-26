import React from 'react'
import propTypes from 'prop-types'

export const HistoryFilter = props => {
  const { handleSubmit, handleChange, handleClear, searchQuery, searchProcessing } = props
  return (
    <div className="orderFilterWrapper">
      <form onSubmit={handleSubmit}>
        {searchQuery !== '' && (
          <span className="fa fa-times-circle searchclear" onClick={handleClear} />
        )}
        <input
          className="orderFilterField"
          autoFocus
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search orders..."
        />
        <div className="orderFilterSubmitBtn" onClick={handleSubmit}>
          Search&nbsp;
          {searchProcessing && <i className="fa fa-spinner fa-spin"></i>}
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
