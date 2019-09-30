import React from 'react'
import PropTypes from 'prop-types'
import HostEntry from './HostEntry'

export const HostEntries = props => {
  const { hosts } = props
  return hosts.map((host, idx) => <HostEntry key={idx} hostInfo={host} />)
}

HostEntries.propTypes = {
  hosts: PropTypes.array.isRequired
}

export default HostEntries
