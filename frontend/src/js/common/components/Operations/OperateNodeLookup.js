import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HostEntries } from './HostEntries'

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

    if (prevState.resolvedHosts.length !== resolvedHosts.length && resolvedHosts.length > 0) {
      this.props.onChange({ resolvedHosts })
    }
  }

  handleChange(event) {
    this.resolveHostnames(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  resolveHostnames(hostnames) {
    const THREE_WORDS_SEPARATED_BY_DOTS = /^\w+\.\w+\.\w+$/

    const hosts = hostnames
      .split(',')
      .filter(maybeHostname => maybeHostname.trim().match(THREE_WORDS_SEPARATED_BY_DOTS))
      .map(hostname => hostname.trim())
      .map(hostname => {
        return {
          hostname,
          requiredRole: this.requiredRoleFor(hostname),
          hasAccess: this.hasUserAccessToHost(hostname)
        }
      })
    this.setState({ resolvedHosts: hosts })
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
    const { placeholder, vmInfoArr } = this.props
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
          <div className="operationsServerList">
            <HostEntries hosts={resolvedHosts} vmInfoArr={vmInfoArr} />
          </div>
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
export default connect(mapStateToProps)(OperateNodeLookup)
