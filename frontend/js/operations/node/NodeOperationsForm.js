import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OperateNodeLookup from './OperateNodeLookup'
import { submitOperation } from '../operateActionCreators'
import { connect } from 'react-redux'
import OperationsButtons from '../../common/components/formComponents/OperationsButtons'
import image from '../../../img/orderTypes/redhat.png'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'

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
    return hosts.filter(host => !host.validation.valid).length === 0
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
            <OperateNodeLookup
              key="hostnames"
              label=""
              placeholder={'Comma separated list of hosts'}
              onChange={v => this.handleChange(v)}
            />
            <ErrorStripe
              show={this.state.resolvedHosts.length > 0 && this.props.submitError}
              message={this.props.submitError}
            />
            <OperationsButtons
              hasAccess={this.state.hasAccess}
              onClick={this.submitHandler.bind(this)}
              submitting={this.props.submitting}
            />
          </div>
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
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error
  }
}

export default connect(mapStateToProps)(NodeOperationsForm)
