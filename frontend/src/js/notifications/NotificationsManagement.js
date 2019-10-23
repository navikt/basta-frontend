import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderTextBox } from '../commonUi/formComponents'
import SubmitButton from '../commonUi/formComponents/SubmitButton'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postNotification } from './notificationsActionCreator'

const initialState = {
  message: ''
}
export class ServerOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidUpdate(prevProps, prevState) {}

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  isValid() {
    return this.state.message !== ''
  }

  render() {
    const { message } = this.state
    const { dispatch, submitting, error } = this.props
    return (
      <React.Fragment>
        <div className="orderForm">
          <div>
            <span className="fa-stack fa-2x">
              <i className="fa fa-circle fa-stack-2x notificationsLogo "></i>
              <i className="fa fa-bell fa-stack-1x fa-inverse" />
            </span>
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Notifications</div>
            <div className="orderFormDescription">System wide alerts</div>
          </div>
          <div className="orderFormItems">
            <OrderTextBox
              label="Notification message"
              placeholder="Enter notification message"
              value={message}
              onChange={v => this.setState({ message: v })}
            />
            <SubmitButton
              submitting={submitting}
              error={error}
              disabled={!this.isValid()}
              onClick={() => dispatch(postNotification(this.state.message))}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ServerOrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    error: state.notificationsForm.form.error,
    submitting: state.notificationsForm.form.submitting
  }
}

export default withRouter(connect(mapStateToProps)(ServerOrderForm))
