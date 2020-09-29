import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Notification } from './Notification'
import { fetchActiveNotifications } from './notificationsActionCreator'

export class ActiveNotificationsList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchActiveNotifications())
  }

  render() {
    const { notifications } = this.props

    return (
      <div>
        {notifications.map((notification, idx) => (
          <Notification key={idx} data={notification} />
        ))}
      </div>
    )
  }
}

ActiveNotificationsList.propTypes = {}

const mapStateToProps = state => {
  return {
    notifications: state.notificationsForm.activeNotifications
  }
}

export default withRouter(connect(mapStateToProps)(ActiveNotificationsList))
