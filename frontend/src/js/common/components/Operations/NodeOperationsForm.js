import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OperateSeraNodeLookup from '../Operations/OperateSeraNodeLookup'
import { submitOperation } from '../../../containers/operate/operateActionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import OperationsButtons from '../formComponents/OperationsButtons'
import image from '../../../../img/orderTypes/redhat.png'
import ErrorPanel from '../formComponents/ErrorPanel'

export class NodeOperationsForm extends Component {
  constructor(props) {
    super(props)
    this.state = { resolvedHosts: [], hasAccess: false }
  }

  handleChange(value) {
    const hosts = value.resolvedHosts
    const hasAccess = this.hasAccessToAllHosts(hosts)
    this.setState({ resolvedHosts: hosts, hasAccess })
  }

  hasAccessToAllHosts(hosts) {
    return hosts.filter(host => !host.hasAccess).length === 0
  }

  submitHandler(operationsType) {
    const { dispatch } = this.props
    const hostnames = this.state.resolvedHosts.map(host => host.hostname)
    const uniqueHostnames = new Set(hostnames)

    dispatch(submitOperation('nodes', uniqueHostnames, operationsType))
  }

  render() {
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">VM Operations</div>
            <div className="orderFormDescription">Start, stop or delete</div>
          </div>
          <div className="orderFormItems">
            <OperateSeraNodeLookup
              key="hostnames"
              label=""
              placeholder={'Comma separated list of hosts'}
              onChange={v => this.handleChange(v)}
            />
          </div>
          <ErrorPanel
            heading="Node operation failed"
            message={this.props.submitError}
            show={this.state.resolvedHosts.length > 0 && this.props.submitError}
          />
          <OperationsButtons
            hasAccess={this.state.hasAccess}
            onClick={this.submitHandler.bind(this)}
          />
        </div>
      </div>
    )
  }
}

NodeOperationsForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user,
    submitError: state.operationsForm.nodes.error
  }
}

export default withRouter(connect(mapStateToProps)(NodeOperationsForm))
