import React from 'react'
import PropTypes from 'prop-types'

const HostEntry = props => {
  const { hostInfo } = props
  const hasAccess = hostInfo.hasAccess
  const accessClass = hasAccess ? 'access-granted' : 'access-denied'

  return (
    <div className="hostCardWrapper">
      <div className="hostnameEntryCard">
        <div className="seraInfo">
          <div className="bold">{hostInfo.hostname}</div>
        </div>
        <div className={`access ${accessClass}`}>{hasAccessIcon(hostInfo.hasAccess)}</div>
      </div>
      {displayAccessDeniedMessage(hasAccess, hostInfo.requiredRole)}
    </div>
  )
}

function displayAccessDeniedMessage(hasAccess, requiredRole) {
  if (!hasAccess) {
    const message = `${requiredRole} or ROLE_SUPERUSER is required`
    return <div className="accessDeniedMessage">{message}</div>
  }
}

function hasAccessIcon(hasAccess) {
  const fontAwesomeIcon = !hasAccess ? 'fa-ban' : 'fa-check'
  return <i className={`fa ${fontAwesomeIcon} icon`} />
}

HostEntry.propTypes = {
  extId: PropTypes.object
}

export default HostEntry
