import React from 'react'
import PropTypes from 'prop-types'
import HostEntry from './HostEntry'

const mergeServerInfo = (hosts, vmInfoArr) => {
  return hosts.map(host => {
    const seraHost = getSeraInfoFor(host.hostname, vmInfoArr)
    return { ...seraHost, ...host }
  })
}

const getSeraInfoFor = (hostname, vmInfoArr) => {
  return vmInfoArr.find(seraHost => seraHost.hostname === hostname) || {}
}

export const HostEntries = props => {
  const { hosts, vmInfoArr } = props
  const serverInfo = mergeServerInfo(hosts, vmInfoArr)
  return serverInfo.map((server, idx) => <HostEntry key={idx} hostInfo={server} />)
}

HostEntries.propTypes = {
  hosts: PropTypes.array.isRequired
}

export default HostEntries
