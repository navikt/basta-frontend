import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { submitOperation, submitGroupLookup } from '../operateActionCreators'
import { connect } from 'react-redux'
import image from '../../../img/orderTypes/security.png'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'
import { ApplicationsDropDown, OperationsButtons } from '../../commonUi/formComponents'
import { logPageView } from '../../amplitude'

const initialState = {
  zone: 'fss',
  application: '',
  groupUsage: 'MQ'
}

export class AdGroupOperationForm extends Component {
  constructor(props) {
    logPageView('/operate/adgroups')
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
    this.props.dispatch(submitOperation('adgroups', this.state))
  }

  groupNotFound() {
    const { lookupComplete, existInAD } = this.props
    if (!lookupComplete) {
      return false
    }
    const groupFound = existInAD

    return !groupFound
  }

  validForm() {
    const requiredFields = this.state.application !== ''
    const groupFound = !this.groupNotFound()

    return requiredFields && groupFound
  }

  groupLookup(form) {
    this.props.dispatch(submitGroupLookup(form))
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
      dispatch(submitGroupLookup(this.state))
    }
  }

  render() {
    const { existInAD, submitting, submitError } = this.props
    const { environmentClass, zone, application } = this.state

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AD Group</div>
            <div className="orderFormDescription">Delete group from AD</div>
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
            <ErrorStripe
              show={this.groupNotFound()}
              message={`Group for ${application} does not exist in AD. There is nothing to delete here.`}
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

AdGroupOperationForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  existInAD: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    application: state.application,
    submitError: state.operationsForm.operations.error,
    lookupComplete: state.operationsForm.groupLookup.lookupComplete,
    existInAD: state.operationsForm.groupLookup.data.existInAD,
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error
  }
}

export default connect(mapStateToProps)(AdGroupOperationForm)
