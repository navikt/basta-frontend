import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  submitOperation,
  submitCredentialLookup
} from '../../../containers/operate/operateActionCreators'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import OperationsButtons from '../formComponents/OperationsButtons'
import image from '../../../../img/orderTypes/redhat.png'
import ErrorPanel from '../formComponents/ErrorPanel'
import InfoPanel from '../formComponents/InfoPanel'

import { OrderButtonGroup, ApplicationsDropDown } from '../formComponents'

export class CredentialsOperationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: { environmentClass: 'u', zone: 'fss', applicationMappingName: null },
      hasAccess: false,
      messages: []
    }
  }

  handleChange(field, value) {
    this.setState({
      form: { ...this.state.form, [field]: value }
    })
  }

  submitHandler(operationsType) {
    this.props.dispatch(submitOperation('credentials', this.state.form, operationsType))
  }

  validateForm(form) {
    return form.environmentClass && form.zone && form.applicationMappingName
  }

  credentialLookup(form) {
    this.props.dispatch(submitCredentialLookup(form))
  }

  verifySchema() {
    const { existInAD, existInFasit } = this.props.credentialsInfo
    let hasAccess
    let messages = []
    if (!(existInAD || existInFasit)) {
      messages.push('Service user not found either in AD or Fasit.')
      hasAccess = false
    } else {
      if (!existInAD && existInFasit) {
        messages.push('Service user not found in AD.')
      } else if (existInAD && !existInFasit) {
        messages.push('Service user not found in Fasit.')
      }
      hasAccess = true
    }
    this.setState({ messages, hasAccess })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.form !== this.state.form && this.state.form.applicationMappingName) {
      this.credentialLookup(this.state.form)
    }
    if (prevProps.credentialsInfo !== this.props.credentialsInfo) {
      this.verifySchema()
    }
  }

  render() {
    const messages = this.state.messages
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AD serviceuser</div>
            <div className="orderFormDescription">Cleaning service user</div>
          </div>
          <div className="orderFormItems">
            <OrderButtonGroup
              key="environmentClass"
              label="Environment Class"
              value={this.state.form.environmentClass}
              description=""
              alternatives={[
                { label: 'Development', value: 'u' },
                { label: 'Test', value: 't' },
                { label: 'PreProd', value: 'q' },
                { label: 'Production', value: 'p', access: ['ROLE_PROD_OPERATIONS'] }
              ]}
              roles={this.props.user.userProfile.roles}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <OrderButtonGroup
              key="zone"
              label="Zone"
              value={this.state.form.zone}
              description=""
              alternatives={[
                { label: 'Fagsystemsone', value: 'fss' },
                { label: 'iApp', value: 'iapp' },
                { label: 'Selvbetjeningssone', value: 'sbs' }
              ]}
              roles={this.props.user.userProfile.roles}
              onChange={v => this.handleChange('zone', v)}
            />
            <ApplicationsDropDown
              key="applicationMappingName"
              label="Application"
              onChange={v => this.handleChange('applicationMappingName', v)}
              value={this.state.form.applicationMappingName}
            />
          </div>
          <ErrorPanel
            heading="Service user operation failed"
            message={this.props.submitError}
            show={this.props.submitError}
          />
          <InfoPanel messages={messages} show={messages.length > 0} />
          <OperationsButtons
            hasAccess={this.state.hasAccess}
            onClick={this.submitHandler.bind(this)}
          />
        </div>
      </div>
    )
  }
}

CredentialsOperationForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  credentialsInfo: PropTypes.object
}

const mapStateToProps = state => {
  return {
    user: state.user,
    credentialsInfo: state.operationsForm.credentialOperations.data,
    submitError: state.operationsForm.credentialOperations.error
  }
}

export default withRouter(connect(mapStateToProps)(CredentialsOperationForm))
