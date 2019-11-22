import React from 'react'
import PropTypes from 'prop-types'

const HostEntry = props => {
  const { hostInfo } = props

  return (
    <div className="hostCardWrapper">
      <div className="hostnameEntryCard">
        <div className="seraInfo">
          <div className="bold">{hostInfo.hostname}</div>
        </div>
        <AccessIcon host={hostInfo} />
      </div>
      <ValidationReason host={hostInfo} />
    </div>
  )
}

HostEntry.propTypes = {
  hostInfos: PropTypes.object
}

const AccessIcon = props => {
  const validHostName = props.host.validation.valid
  const fontAwesomeIcon = validHostName ? 'fa-check' : 'fa-ban'
  const backgroundColor = validHostName ? 'validation-ok-color' : 'validation-error-color'

  return (
    <div className={`access ${backgroundColor}`}>
      <i className={`fa ${fontAwesomeIcon} icon`} />
    </div>
  )
}

const ValidationReason = props => {
  const validHostName = props.host.validation.valid
  const reason = props.host.validation.reason

  if (!validHostName) {
    return <div className="accessDeniedMessage">{reason}</div>
  }
  return null
}

export default HostEntry
