import React from 'react'
import PropTypes from 'prop-types'

const InfoPanel = props => {
  const { messages, show } = props

  if (!show) {
    return null
  }

  const showInfo = messages => {
    if (typeof messages === 'object') {
      return messages.map(e => {
        return (
          <div key={Math.random(1)}>
            <i className="fa fa-exclamation-circle rightpad" /> {e}
          </div>
        )
      })
    }
  }

  return <div className="info-message">{showInfo(messages)}</div>
}

InfoPanel.propTypes = {
  messages: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default InfoPanel
