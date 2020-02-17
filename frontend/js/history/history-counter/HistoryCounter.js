import React from 'react'
import propTypes from 'prop-types'

export const HistoryCounter = props => {
  const { dispatch, getOrderHistory, totalOrders, displayingOrders, maxOrders } = props
  return (
    <div className="history-counter-container">
      <div className="history-counter-value">
        <h3>
          {`${displayingOrders}/${totalOrders}/${maxOrders}`}{' '}
          <a
            className="history-counter-incrementer"
            onClick={() => dispatch(getOrderHistory(null, incrementValueBy(maxOrders, 5000)))}
          >
            +
          </a>
        </h3>
      </div>
    </div>
  )
}

const incrementValueBy = (origValue, incrementedBy) => {
  return origValue + incrementedBy
}

HistoryCounter.propTypes = {
  dispatch: propTypes.func,
  getOrderHistory: propTypes.func,
  totalOrders: propTypes.number,
  displayingOrders: propTypes.number,
  maxOrders: propTypes.number
}

export default HistoryCounter
