import React, { Component } from 'react'
import { applyOrderHistoryFilter, getOrderHistory } from './actionCreators'
import PageHeading from '../common/components/PageHeading'
import BottomScrollListener from './BottomScrollListener'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import HistoryFilter from './HistoryFilter'
import OrderList from './order-list/OrderList'
import HistoryCounter from './history-counter/HistoryCounter'
import { InfoStripe } from '../commonUi/formComponents/AlertStripe'

export class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      maxResults: 20
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
    const { dispatch, filteredOrderHistory, totalOrders, maxOrders, filterApplied } = this.props
    const { maxResults } = this.state

    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <div className="history-header">
          <PageHeading icon="fa-history" heading="Order history" description="" />
          <HistoryCounter
            totalOrders={totalOrders}
            displayingOrders={maxResults}
            maxOrders={maxOrders}
            getOrderHistory={getOrderHistory}
            dispatch={dispatch}
          />
        </div>
        <HistoryFilter
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
        />
        {filterApplied && filteredOrderHistory.length === 0 ? (
          <InfoStripe
            show={true}
            message={`No orders matching current filter criteria. NOTE: We only apply the filter on the ${totalOrders} orders currently fetched. Try fetching more orders by clicking the + sign next to the total order counter.`}
          />
        ) : (
          <OrderList
            filterApplied={filterApplied}
            orderHistory={filteredOrderHistory.slice(0, maxResults)}
          />
        )}
      </div>
    )
  }
}

History.propTypes = {
  dispatch: propTypes.func,
  filteredOrderHistory: propTypes.array,
  filterApplied: propTypes.bool,
  totalOrders: propTypes.number,
  maxOrders: propTypes.number
}

const mapStateToProps = state => {
  return {
    filteredOrderHistory: state.orderHistory.filteredOrderHistory,
    filterApplied: state.orderHistory.filterApplied,
    totalOrders: state.orderHistory.totalOrders,
    maxOrders: state.orderHistory.maxOrders
  }
}

export default connect(mapStateToProps)(History)
