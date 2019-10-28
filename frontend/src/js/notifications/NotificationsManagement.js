import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderTextBox } from '../commonUi/formComponents'
import SubmitButton from '../commonUi/formComponents/SubmitButton'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postNotification, removeNotification } from './notificationsActionCreator'
import moment from 'moment'

const initialState = {
  message: ''
}
export class ServerOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

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
        <div className="notificationsForm">
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
              onClick={() => {
                this.setState(initialState)
                dispatch(postNotification(this.state))
              }}
            />
          </div>
        </div>
        <h1 className="activeNotifications">Active notifications</h1>
        {this.renderActiveNotifications()}
      </React.Fragment>
    )
  }

  renderActiveNotifications() {
    const { activeNotifications, dispatch } = this.props

    if (activeNotifications.length === 0) {
      return <p>No active notifications</p>
    }

    return activeNotifications.map((notification, idx) => {
      return (
        <React.Fragment key={idx}>
          <div className="manageNotification">
            <div>
              <div
                className="disableNotification-btn"
                onClick={() => dispatch(removeNotification(notification.id))}
              >
                Remove
              </div>
            </div>
            <div>
              <div>
                <div>{notification.message}</div>
              </div>
            </div>
            <div>
              <div>{notification.createdByDisplayName}</div>
              <div>{moment(notification.created).format('DD-MMM YYYY HH:mm')}</div>
            </div>
          </div>
        </React.Fragment>
      )
    })
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
    submitting: state.notificationsForm.form.submitting,
    activeNotifications: state.notificationsForm.activeNotifications
  }
}

export default withRouter(connect(mapStateToProps)(ServerOrderForm))
