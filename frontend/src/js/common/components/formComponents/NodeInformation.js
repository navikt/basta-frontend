import React from 'react'
import PropTypes from 'prop-types'

const mergeServerInfo = (hostnames, vmInfoArr) => {
  //const arr = Array.from(hostnames) // konverterer fra Set til Array for map() og filter()
  return [...hostnames].map(hostname => {
    const results = vmInfoArr.filter(vmInfo => {
      return vmInfo.hostname === hostname
    })
    return results.length > 0 ? results[0] : { hostname: hostname, notFound: true }
  })
}

const createServerTable = servers => {
  return servers.map(server => {
    if (server.notFound) {
      return (
        <tr key={Math.random(0, 1)}>
          <td>{server.hostname}</td>
        </tr>
      )
    } else {
      return (
        <tr key={Math.random(0, 1)}>
          <td>{server.status}</td>
          <td>{server.hostname}</td>
          <td>{server.site}</td>
          <td>{server.cpu}</td>
          <td>{server.memory}</td>
          <td>{server.disk}</td>
        </tr>
      )
    }
  })
}

export const NodeInformation = props => {
  const { hostnames, vmInfoArr } = props
  const serverInfo = mergeServerInfo(hostnames, vmInfoArr)
  return (
    <table>
      <tbody>
        <tr
          className={
            serverInfo.length > 0
              ? 'operationsServerListHeader'
              : 'operationsServerListHeader disabled'
          }
          key={Math.random(0, 1)}
        >
          <th>status</th>
          <th>hostname</th>
          <th>site</th>
          <th>cpu</th>
          <th>memory</th>
          <th>disk</th>
        </tr>
        {createServerTable(serverInfo)}
      </tbody>
    </table>
  )
}

NodeInformation.propTypes = {
  hostnames: PropTypes.object.isRequired
}

export default NodeInformation
