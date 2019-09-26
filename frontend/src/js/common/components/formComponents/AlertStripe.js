import React from 'react'
import PropTypes from 'prop-types'

const AlertStripe = props => {
  const { message, show } = props

  if (!show) {
    return null
  }

  return (
    <div className="formComponentGrid">
      <div className="orderFormInfoBox">
        <span className="orderFormInfoBoksIcon">
          <i className="fa fa-exclamation-circle fa-2x" />
        </span>
        <p className="orderFormInfoBoksTekst">{message}</p>
      </div>
    </div>
  )
}

AlertStripe.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
}

export default AlertStripe
