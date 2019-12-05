import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { submitOperation, submitCredentialLookup } from '../operateActionCreators'
import { connect } from 'react-redux'
import image from '../../../img/orderTypes/redhat.png'
import ErrorPanel from '../../common/components/formComponents/ErrorPanel'
import InfoPanel from '../../common/components/formComponents/InfoPanel'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { ApplicationsDropDown, OperationsButtons } from '../../commonUi/formComponents'

const initialState = {
  zone: 'fss',
  application: ''
}

export class CredentialsOperationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
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
    const { environmentClass, zone, application } = this.state
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AD serviceuser</div>
            <div className="orderFormDescription">Delete serviceuser from AD, Fasit and Vault</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <ZoneButtonGroup value={zone} onChange={v => this.handleChange('zone', v)} />
            <ApplicationsDropDown
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
          </div>
          <ErrorPanel
            heading="Service user operation failed"
            message={this.props.submitError}
            show={this.props.submitError}
          />
          {/*<InfoPanel messages={messages} show={messages.length > 0} />*/}
          <OperationsButtons
            hasAccess={this.state.hasAccess}
            onClick={this.submitHandler.bind(this)}
            hideStopButton={true}
            hideStartButton={true}
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
    credentialsInfo: state.operationsForm.credentialLookup.data,
    submitError: state.operationsForm.operations.error
  }
}

export default connect(mapStateToProps)(CredentialsOperationForm)
