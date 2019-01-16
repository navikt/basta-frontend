import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import history from '../../common/history'
import Select from 'react-select'

const OrderHistory = props => {
  const orderHistory = props.data

  if (orderHistory && orderHistory.length > 0) {
    const options = mapToOptions(orderHistory)
    return (
      <div className="history">
        <Select
          isSearchable={false}
          onChange={e => history.push(`/orders/${e.value}`)}
          options={options}
          value={options[0]}
        />
      </div>
    )
  }
  return null
}

const mapToOptions = results => {
  return results.map(result => {
    const label = `${result.id} ${result.orderOperation.toLowerCase()} (${moment(
      result.created
    ).fromNow()})`
    return { label, value: result.id }
  })
}

OrderHistory.propTypes = {
  data: PropTypes.array
}

export default OrderHistory
