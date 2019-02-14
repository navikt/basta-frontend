import React from 'react'
import PropTypes from 'prop-types'
import imageType from '../../../containers/imageType'

const HostnameEntry = props => {
  const { hostInfo } = props

  return (
    <div className="hostnameEntryCard">
      <div className="seraNodeImage seraInfoImage">
        <img src={imageType(hostInfo.type)} />
      </div>
      <div className="seraInfo">
        <div>
          {powerIcon(hostInfo.status)}
          {hostInfo.hostname}
        </div>
        <div>
          {[hostInfo.application, hostInfo.environment, hostInfo.rpm_rpm]
            .filter(elem => elem !== undefined)
            .join(' | ')}
        </div>
      </div>
    </div>
  )
}

function powerIcon(powerStatus) {
  if (!powerStatus) {
    return null
  }

  const powerStatusClassName = powerStatus === 'poweredOff' ? 'powered-off' : 'powered-on'

  return <i className={`fa fa-power-off ${powerStatusClassName} rightpad`} />
}

HostnameEntry.propTypes = {
  extId: PropTypes.object
}

export default HostnameEntry
