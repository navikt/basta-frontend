import React from 'react'
import PropTypes from 'prop-types'

const MonitorButton = props => {
  const { monitoring, toggleMonitoring } = props
  return monitoring ? (
    <div className="monitorButton" onClick={toggleMonitoring}>
      <i className="fa fa-spinner fa-spin" /> &nbsp;Monitoring
    </div>
  ) : (
    <div className="monitorButton" onClick={toggleMonitoring}>
      <i className="fa fa-video-camera" /> Start monitoring
    </div>
  )
}

MonitorButton.propTypes = {
  data: PropTypes.object
}

export default MonitorButton
