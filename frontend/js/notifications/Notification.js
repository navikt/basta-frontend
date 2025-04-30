import React from 'react'
import PropTypes from 'prop-types'
import { InfoStripe } from '../commonUi/formComponents/AlertStripe'
import moment from 'moment'

export const Notification = props => {
  const { data } = props

  return (
    <InfoStripe show={true} className="notificationItem">
      <div className="notificationMessage">
        <div className="notificationMessage alertStripeText">{data.message}</div>
        <div className=" updatedBy alertStripeText">
          <div>{data.createdByDisplayName}</div>
          <div>{moment.unix(data.created).format('DD MMM YYYY HH:mm')}</div>
        </div>
      </div>
    </InfoStripe>
  )
}

Notification.propTypes = {
  data: PropTypes.object
}
