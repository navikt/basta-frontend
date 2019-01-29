import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../common/history'
import Spinner from '../../common/components/Spinner'
import PropTypes from 'prop-types'

export class Order extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { form } = nextProps.order

    if (Number.isInteger(form.id)) {
      history.push('/orders/' + form.id)
    }
  }

  render() {
    const { form } = this.props.order
    if (form.submitting) {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">Submitting form</div>
          <div className="panel-body">
            <div className="infobox">
              <div className="icon">
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      )
    } else if (form.error) {
      return (
        <div className="panel panel-error">
          <div className="panel-heading">Submitting form failed</div>
          <div className="panel-body">
            <div className="infobox">
              <div className="icon">
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
              </div>
              <div className="content">{form.error}</div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

Order.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  }
}

export default connect(mapStateToProps)(Order)
