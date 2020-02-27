import React, { Component } from 'react'
import { searchOrders, getOrderHistory } from './actionCreators'
import BottomScrollListener from './BottomScrollListener'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import HistoryFilter from './HistoryFilter'
import OrderList from './order-list/OrderList'

export class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      maxResults: 20
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const { dispatch } = this.props
    const { searchQuery } = this.state
    event.preventDefault()
    if (searchQuery !== '') {
      dispatch(searchOrders(this.state.searchQuery))
    } else {
      dispatch(getOrderHistory())
    }
  }

  handleClear() {
    const { dispatch } = this.props
    this.setState({ searchQuery: '' })
    dispatch(getOrderHistory())
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  onBottom() {
    const maxResults = this.state.maxResults
    const totalOrders = this.props.totalOrders

    if (maxResults + 10 <= totalOrders) {
      this.setState({ maxResults: maxResults + 10 })
    } else {
      this.setState({ maxResults: maxResults + (totalOrders - maxResults) })
    }
  }

  render() {
    console.log('state', this.state)
    const {
      orderHistory,
      orderHistoryReceived,
      searchProcessing,
      totalOrders,
      filterApplied
    } = this.props
    const { maxResults, searchQuery } = this.state

    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <HistoryFilter
          searchQuery={searchQuery}
          searchProcessing={searchProcessing}
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
          handleClear={event => this.handleClear(event)}
        />
        {filterApplied && (
          <div className="searchResultCounter">
            {`Showing ${maxResults} of ${totalOrders} matches`}
          </div>
        )}
        <OrderList
          orderHistoryReceived={orderHistoryReceived}
          orderHistory={orderHistory.slice(0, maxResults)}
        />
      </div>
    )
  }
}

History.propTypes = {
  dispatch: propTypes.func
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory.orderHistory,
    orderHistoryReceived: state.orderHistory.orderHistoryReceived,
    totalOrders: state.orderHistory.totalOrders,
    searchProcessing: state.orderHistory.searchProcessing,
    filterApplied: state.orderHistory.filterApplied
  }
}

export default connect(mapStateToProps)(History)
