import React from 'react'
import PropTypes from 'prop-types'
import HostnameEntry from './HostnameEntry'

const mergeServerInfo = (hostnames, vmInfoArr) => {
  return [...hostnames].map(hostname => {
    const results = vmInfoArr.filter(vmInfo => {
      return vmInfo.hostname === hostname
    })
    return results.length > 0 ? results[0] : { hostname: hostname, notFound: true }
  })
}

export const NodeInformation = props => {
  const { hostnames, vmInfoArr } = props
  const serverInfo = mergeServerInfo(hostnames, vmInfoArr)
  return serverInfo.map((server, idx) => <HostnameEntry key={idx} hostInfo={server} />)
}

NodeInformation.propTypes = {
  hostnames: PropTypes.object.isRequired
}

export default NodeInformation
