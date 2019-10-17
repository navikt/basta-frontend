import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import PageHeading from '../../common/components/PageHeading'
import Spinner from '../../common/components/Spinner'
import Request from './Request'
import Results from './Results'
import Log from './Log'
import { getOrder, getStatusLog } from '../../order/actionCreators'

export class OrderDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      monitoring: true
    }
  }

  componentDidMount() {
    const { order, dispatch } = this.props
    this.interval = setInterval(() => this.setState({ time: this.state.time + 1 }), 1000)
    if (!order.data) {
      dispatch(getOrder(this.props.match.params.orderId))
      dispatch(getStatusLog(this.props.match.params.orderId))
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const { order, dispatch } = this.props
    const { time, monitoring } = this.state
    if (order.details.data) {
      if (order.details.data.status === 'PROCESSING' && monitoring && time > 20) {
        this.setState({ time: 0 })
        dispatch(getStatusLog(this.props.match.params.orderId))
      }
    }
  }

  toggleMonitoring() {
    this.setState({ monitoring: !this.state.monitoring })
  }

  render() {
    const { details, statuslog } = this.props.order
    return details.data ? (
      <div>
        <PageHeading
          icon="fa-refresh"
          heading={details.data.id.toString()}
          description={
            details.data.orderOperation +
            ' | ' +
            details.data.orderType +
            ' | ' +
            details.data.orderDescription +
            ' | ' +
            moment(details.created).fromNow()
          }
        />
        <div className="orderDetails">
          <Results data={details.data.resultDetails} type={details.data.orderType} />
          <Request data={details.data} />
          <Log
            processing={details.data.status === 'PROCESSING'}
            data={statuslog}
            monitoring={this.state.monitoring}
            toggleMonitoring={() => this.toggleMonitoring()}
          />
        </div>
      </div>
    ) : (
      <Spinner />
    )
  }
}

OrderDetails.propTypes = {}

const mapStateToProps = state => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderDetails)
