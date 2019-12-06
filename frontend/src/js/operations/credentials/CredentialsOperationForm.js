import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { submitOperation, submitCredentialLookup } from '../operateActionCreators'
import { connect } from 'react-redux'
import image from '../../../img/orderTypes/redhat.png'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { InfoStripe, ErrorStripe } from '../../commonUi/formComponents/AlertStripe'
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
    this.props.dispatch(submitOperation('credentials', this.state.form))
  }

  userNotFound() {
    const { lookupComplete, existInAD, existInFasit } = this.props
    if (!lookupComplete) {
      return false
    }
    const userFound = existInAD || existInFasit

    return !userFound
  }

  validForm() {
    const requiredFields = this.state.application !== ''
    const userFound = !this.userNotFound()

    return requiredFields && userFound
  }

  credentialLookup(form) {
    this.props.dispatch(submitCredentialLookup(form))
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, zone, application } = this.state
    const prevEnvClass = prevState.environmentClass
    const prevZone = prevState.zone
    const prevApp = prevState.application
    const { dispatch } = this.props

    if (
      application !== '' &&
      (environmentClass !== prevEnvClass || zone !== prevZone || application !== prevApp)
    ) {
      dispatch(submitCredentialLookup(this.state))
    }
  }

  render() {
    const { existInAD, existInFasit, submitting, submitError } = this.props
    const { environmentClass, zone, application } = this.state

    console.log('submiterror', submitError)

    console.log('AD', existInAD, 'fasit', existInFasit)

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
            <InfoStripe
              show={!existInFasit && existInAD}
              message={`Service user for ${application} does not exist in fasit for this in this environment class and zone. Service user will only be deleted from AD.`}
            />
            <InfoStripe
              show={!existInAD && existInFasit}
              message={`Service user for ${application} does not exist in AD for this in this environment class and zone. Service user will only be deleted from Fasit.`}
            />
            <ErrorStripe
              show={this.userNotFound()}
              message={`Service user for ${application} does not exist in either AD or Fasit. There is nothing to delete here.`}
            />
            <ErrorStripe show={this.validForm() && submitError} message={submitError} />
            <OperationsButtons
              hasAccess={this.validForm()}
              onClick={this.submitHandler.bind(this)}
              submitting={submitting}
              hideStopButton={true}
              hideStartButton={true}
            />
          </div>
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
    submitError: state.operationsForm.operations.error,
    lookupComplete: state.operationsForm.credentialLookup.lookupComplete,
    existInFasit: state.operationsForm.credentialLookup.data.existInFasit,
    existInAD: state.operationsForm.credentialLookup.data.existInAD,
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error
  }
}

export default connect(mapStateToProps)(CredentialsOperationForm)
