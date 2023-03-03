import React, { Component } from 'react'
import { connect } from 'react-redux'
import HostEntry from './HostEntry'

export class OperateNodeLookup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      resolvedHosts: []
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { resolvedHosts } = this.state

    const prevStateHostnames = prevState.resolvedHosts.map(host => host.hostname)
    const hostnames = resolvedHosts.map(host => host.hostname)

    if (JSON.stringify(prevStateHostnames) !== JSON.stringify(hostnames)) {
      this.props.onChange({ resolvedHosts })
    }
  }

  handleChange(event) {
    this.resolveHostnames(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  resolveHostnames(hostnames) {
    const MINIMUM_HOSTNAME_LENGTH = 10

    const hosts = hostnames
      .split(',')
      .filter(maybeHostname => maybeHostname.trim().length >= MINIMUM_HOSTNAME_LENGTH)
      .map(hostname => hostname.trim())
      .map(hostname => {
        return {
          hostname,
          validation: this.validate(hostname)
        }
      })
    this.setState({ resolvedHosts: hosts })
  }

  validate(hostname) {
    if (!this.hasValidPrefix(hostname)) {
      return {
        valid: false,
        reason: 'Invalid hostname format'
      }
    } else if (!this.hasUserAccessToHost(hostname)) {
      const requiredRoles = this.requiredRoleFor(hostname)
      return {
        valid: false,
        reason: `${requiredRoles} or ROLE_SUPERUSER is required`
      }
    } else if (!this.hasValidDomain(hostname)) {
      return {
        valid: false,
        reason: 'Unknown domain in hostname'
      }
    } else if (this.isMqHost(hostname)) {
      return {
        valid: false,
        reason: 'MQ production hosts are not allowed'
      }
    } else {
      return { valid: true }
    }
  }

  hasValidPrefix(hostname) {
    const validPrefix = ['a01', 'a30', 'b27', 'b31', 'd26', 'd32', 'a34', 'e34']
    const prefix = hostname.substring(0, 3).toLowerCase()

    return validPrefix.includes(prefix)
  }

  hasValidDomain(hostname) {
    if (hostname.split('.').length < 3) {
      return false
    }
    const validDomains = [
      'adeo.no',
      'oera.no',
      'preprod.local',
      'oera-q.local',
      'test.local',
      'oera-t.local',
      'devillo.no'
    ]
    const domain = hostname
      .split('.')
      .slice(-2)
      .join('.')

    return validDomains.includes(domain)
  }

  isMqHost(hostname) {
    const mqHostnames = [
      'a01apvl247.adeo.no',
      'a01apvl269.adeo.no',
      'a01apvl270.adeo.no',
      'a01apvl271.adeo.no',
      'a01apvl279.adeo.no',
      'a01apvl280.adeo.no',
      'a01apvl281.adeo.no',
      'a01apvl282.adeo.no',
      'a01apvl283.adeo.no',
      'a01apvl284.adeo.no',
      'a01apvl285.adeo.no',
      'a01apvl286.adeo.no'
    ]

    return mqHostnames.includes(hostname)
  }
  hasUserAccessToHost(hostname) {
    const roles = this.props.user.userProfile.roles
    const requiredRole = this.requiredRoleFor(hostname)
    return roles.includes(requiredRole) || roles.includes('ROLE_SUPERUSER')
  }

  requiredRoleFor(hostname) {
    switch (hostname.toLowerCase().charAt(0)) {
      case 'a':
        return 'ROLE_PROD_OPERATIONS'
      case 'b':
      case 'd':
        return 'ROLE_OPERATIONS'
      case 'e':
        return 'ROLE_USER'
      default:
        return 'ROLE_PROD_OPERATIONS'
    }
  }

  render() {
    const { placeholder } = this.props
    const { resolvedHosts } = this.state
    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <input
            className="formComponentTextField"
            name="input"
            type="text"
            placeholder={placeholder || 'description...'}
            value={this.state.input}
            onChange={e => this.handleChange(e)}
          />
          <HostEntries hosts={resolvedHosts} />
        </div>
      </div>
    )
  }
}

OperateNodeLookup.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const HostEntries = props => {
  return (
    <div className="operationsServerList">
      {props.hosts.map((host, idx) => (
        <HostEntry key={idx} hostInfo={host} />
      ))}
    </div>
  )
}

export default connect(mapStateToProps)(OperateNodeLookup)
