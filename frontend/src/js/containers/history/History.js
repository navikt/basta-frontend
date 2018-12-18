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
      nMaxResults: 20
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
    const nMaxResults = this.state.nMaxResults
    const totalOrders = this.props.totalOrders

    if (nMaxResults + 10 <= totalOrders) {
      this.setState({ nMaxResults: nMaxResults + 10 })
    } else {
      this.setState({ nMaxResults: nMaxResults + (totalOrders - nMaxResults) })
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { filter, nMaxResults } = this.state
    dispatch(applyOrderHistoryFilter(filter))
  }

  render() {
    const { filteredOrderHistory, totalOrders } = this.props
    const { nMaxResults } = this.state

    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <div className="history-header">
          <PageHeading icon="fa-history" heading="Order history" description="" />
          <HistoryCounter totalOrders={totalOrders} displayingOrders={nMaxResults} />
        </div>
        <HistoryFilter
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
        />
        <OrderList orderHistory={filteredOrderHistory.slice(0, this.state.nMaxResults)} />
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
