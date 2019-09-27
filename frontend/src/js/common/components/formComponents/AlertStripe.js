import React from 'react'
import PropTypes from 'prop-types'

const AlertStripe = props => {
  const { message, show, type = 'info' } = props

  if (!show) {
    return null
  }

  if (type === 'error') {
    return (
      <div className="formComponentGrid">
        <div className="alertStripe errorStripe">
          <span className="alertStripeIcon errorIcon">
            <i className="fa fa-times-circle fa-3x" />
          </span>
          <p className="alertStripeTex">{message}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="formComponentGrid">
        <div className="alertStripe infoStripe">
          <span className="alertStripeIcon infoIcon">
            <i className="fa fa-exclamation-circle fa-2x" />
          </span>
          <p className="alertStripeText">{message}</p>
        </div>
      </div>
    )
  }
}

AlertStripe.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
}

export default AlertStripe
