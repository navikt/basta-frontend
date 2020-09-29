import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { submitOperation, submitCustomCredentialLookup } from '../operateActionCreators'
import { connect } from 'react-redux'
import image from '../../../img/orderTypes/security.png'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'
import { OperationsButtons } from '../../commonUi/formComponents'

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

  submitHandler() {
    this.props.dispatch(submitOperation('credentials', this.state))
  }

  userNotFound() {
    const { lookupComplete, existInAD } = this.props
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
    this.props.dispatch(submitCustomCredentialLookup(form))
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

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AD serviceuser not in Fasit</div>
            <div className="orderFormDescription">Delete serviceuser from AD and Vault</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <ZoneButtonGroup value={zone} onChange={v => this.handleChange('zone', v)} />
            <ErrorStripe
              show={this.userNotFound()}
              message={`Service user for ${application} does not exist in AD. There is nothing to delete here.`}
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
  existInFasit: PropTypes.bool,
  existInAD: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    user: state.user,
    submitError: state.operationsForm.operations.error,
    lookupComplete: state.operationsForm.credentialLookup.lookupComplete,
    existInFasit: state.operationsForm.credentialLookup.data.existInFasit,
    existInAD: state.operationsForm.credentialLookup.data.existInAD,
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error
  }
}

export default connect(mapStateToProps)(CredentialsOperationForm)
