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
            onClick={() =>
              dispatch(getOrderHistory(null, null, null, incrementValueBy(maxOrders, 1000)))
            }
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
  dispatch: propTypes.func.isRequired,
  getOrderHistory: propTypes.func.isRequired,
  totalOrders: propTypes.number.isRequired,
  displayingOrders: propTypes.number.isRequired,
  maxOrders: propTypes.number.isRequired
}

export default HistoryCounter
