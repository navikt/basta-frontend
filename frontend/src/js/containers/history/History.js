import React, { Component } from 'react'
import { applyOrderHistoryFilter } from './actionCreators'
import PageHeading from '../../common/components/PageHeading'
import BottomScrollListener from '../../common/components/BottomScrollListener'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import HistoryFilter from '../../common/components/HistoryFilter'
import OrderList from './order-list/OrderList'
import HistoryCounter from './history-counter/HistoryCounter'

export class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      maxResults: 20,
      maxOrders: 5000
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(applyOrderHistoryFilter(this.state.filter))
  }

  handleChange(event) {
    this.setState({ filter: event.target.value })
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

  componentDidMount() {
    const { dispatch } = this.props
    const { filter } = this.state
    dispatch(applyOrderHistoryFilter(filter))
  }

  render() {
    const { filteredOrderHistory, totalOrders } = this.props
    const { maxResults, maxOrders } = this.state

    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <div className="history-header">
          <PageHeading icon="fa-history" heading="Order history" description="" />
          <HistoryCounter
            totalOrders={totalOrders}
            displayingOrders={maxResults}
            nMaxOrders={maxOrders}
            handleChange={event => this.handleChange(event)}
          />
        </div>
        <HistoryFilter
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
        />
        <OrderList orderHistory={filteredOrderHistory.slice(0, maxResults)} />
      </div>
    )
  }
}

History.propTypes = {
  dispatch: propTypes.func,
  filteredOrderHistory: propTypes.array,
  totalOrders: propTypes.number
}

const mapStateToProps = state => {
  return {
    filteredOrderHistory: state.orderHistory.filteredOrderHistory,
    totalOrders: state.orderHistory.totalOrders
  }
}

export default connect(mapStateToProps)(History)
