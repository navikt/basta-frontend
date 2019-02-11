import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OperateSeraNodeLookup from './formComponents/OperateSeraNodeLookup'
import { submitOperation } from '../../containers/operate/operateActionCreators'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import OperationsButtons from './formComponents/OperationsButtons'
import image from '../../../img/orderTypes/redhat.png'

export class NodeOperationsForm extends Component {
  constructor(props) {
    super(props)
    this.state = { hostnames: '' }
  }

  handleChange(value) {
    this.setState({ hostnames: value })
  }

  submitHandler(operationsType) {
    const { dispatch } = this.props
    dispatch(submitOperation('nodes', this.state, operationsType))
  }

  doesUserHaveRole(role) {
    return this.props.user.userProfile.roles.includes(role)
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
              value={this.state.hostnames}
              placeholder={'comma separated list of hosts'}
              onChange={v => this.handleChange(v)}
            />
          </div>
          <OperationsButtons
            hasAccess={this.doesUserHaveRole(this.state.hostnames.requiredAccess)}
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
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(NodeOperationsForm))
