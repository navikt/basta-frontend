import React from 'react'
import PropTypes from 'prop-types'
import imageType from '../../../containers/imageType'

const HostEntry = props => {
  const { hostInfo } = props
  const hasAccess = hostInfo.hasAccess
  const accessClass = hasAccess ? 'access-granted' : 'access-denied'

  return (
    <div className="hostCardWrapper">
      <div className="hostnameEntryCard">
        <div className="seraNodeImage seraInfoImage">
          <img src={imageType(hostInfo.type)} />
        </div>
        <div className="seraInfo">
          <div className="bold">{hostInfo.hostname}</div>
          <div>
            {[hostInfo.application, hostInfo.environment, hostInfo.rpm_rpm]
              .filter(elem => elem !== undefined)
              .join(' | ')}
          </div>
        </div>
        <div className="powerstatus">{powerIcon(hostInfo.status)}</div>
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

function powerIcon(powerStatus) {
  if (!powerStatus) {
    return null
  }

  const powerStatusClassName = powerStatus === 'poweredOff' ? 'powered-off' : 'powered-on'
  return <i className={`fa fa-power-off ${powerStatusClassName} icon rightpad`} />
}

HostEntry.propTypes = {
  extId: PropTypes.object
}

export default HostEntry
