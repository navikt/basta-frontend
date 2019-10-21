import React from 'react'
import PropTypes from 'prop-types'

const AlertStripe = props => {
  const { message, show, type } = props

  if (!show) {
    return null
  }

  let iconClass, stripeClass, icon

  if (type === 'error') {
    iconClass = 'errorIcon'
    stripeClass = 'errorStripe'
    icon = 'fa-times-circle'
  } else {
    icon = 'fa-exclamation-circle'
    iconClass = 'infoIcon'
    stripeClass = 'infoStripe'
  }

  return (
    <div className="formComponentGrid">
      <div className={`alertStripe ${stripeClass}`}>
        <span className={`alertStripeIcon ${iconClass}`}>
          <i className={`fa ${icon} fa-2x`} />
        </span>
        <p className="alertStripeText">{message}</p>
      </div>
    </div>
  )
}

AlertStripe.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
}

const ErrorStripe = props => {
  return <AlertStripe type="error" {...props} />
}

const InfoStripe = props => {
  return <AlertStripe type="info" {...props} />
}

export { ErrorStripe, InfoStripe }
