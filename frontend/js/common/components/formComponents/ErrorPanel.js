import React from 'react'
import PropTypes from 'prop-types'

const ErrorPanel = props => {
  const { heading, message, show } = props

  if (!show) {
    return null
  }

  return (
    <div className="error-message">
      <i className="fa fa-exclamation-circle rightpad" aria-hidden="true" />
      {`${heading} ${message}`}
    </div>
  )
}

ErrorPanel.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default ErrorPanel
