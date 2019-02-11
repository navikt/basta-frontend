import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { NodeInformation } from './NodeInformation'
import { fetchVmInfo } from '../../../containers/operate/operateActionCreators'

export class OperateSeraNodeLookup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      hostnames: new Set(),
      requiredAccess: 'ROLE_OPERATIONS'
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props
    const { hostnames, requiredAccess } = this.state
    if (prevState.hostnames !== hostnames && hostnames.size > 0) {
      dispatch(fetchVmInfo(hostnames))
      this.props.onChange({ hostnames, requiredAccess })
    }
  }

  handleChange(event) {
    this.splitMatchAndTrim(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  splitMatchAndTrim(hostnames) {
    let set = new Set()
    const arr = hostnames.split(',')
    arr.forEach(e => {
      const trimmed = e.trim()
      if (trimmed.match(/^\w+\.\w+\.\w+$/)) set.add(trimmed)
    })
    if (set.size > 0) {
      this.resolveAccessRequirement(set)
    } else {
      this.setState({ hostnames: new Set() })
    }
  }

  resolveAccessRequirement(hostnames) {
    hostnames.forEach(hostname => {
      switch (hostname.toLowerCase().charAt(0)) {
        case 'a':
          this.setState({ requiredAccess: 'ROLE_PROD_OPERATIONS' })
          break
        case 'b':
        case 'd':
        case 'e':
          this.setState({ requiredAccess: 'ROLE_OPERATIONS' })
          break
        default:
          this.setState({ requiredAccess: 'ROLE_PROD_OPERATIONS' })
          break
      }
      this.setState({ hostnames: hostnames })
    })
  }

  render() {
    const { label, description, placeholder, vmInfoArr } = this.props
    const { hostnames } = this.state
    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">
          {label}
          {description ? (
            <i
              className="fa fa-question-circle formComponentLabelDescription"
              data-tip={description}
            />
          ) : null}
        </div>
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
            <NodeInformation hostnames={hostnames} vmInfoArr={vmInfoArr} />
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

OperateSeraNodeLookup.propTypes = {}

const mapStateToProps = state => {
  return {
    vmInfoArr: state.orderFormData.vmOperations.data
  }
}
export default connect(mapStateToProps)(OperateSeraNodeLookup)
