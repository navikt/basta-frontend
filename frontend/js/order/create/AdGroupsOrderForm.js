import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApplicationsDropDown, OrderCheckBox } from '../../commonUi/formComponents'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { submitCredentialLookup } from '../../operations/operateActionCreators'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { InfoStripe } from '../../commonUi/formComponents/AlertStripe'
import { clearExistingCredentialMessage } from '../../common/actionCreators'
import { orderApiPath } from './configuration/credentials'

const certificateImage = require('../../../img/orderTypes/security.png')
const initialState = {
  zone: 'fss',
  application: '',
  groupUsage: 'MQ'
}

export class CredentialOrderForm extends Component {
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

  componentWillUnmount() {
    this.props.dispatch(clearExistingCredentialMessage())
  }

  validOrder() {
    return this.state.application !== ''
  }

  render() {
    const { environmentClass, zone, application } = this.state
    const { dispatch, formError, formSubmitting } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={certificateImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Credential</div>
            <div className="orderFormDescription">for service user</div>
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
            <SubmitButton
              error={formError}
              submitting={formSubmitting}
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm(this.state, orderApiPath))}
            />
          </div>
        </div>
      </div>
    )
  }
}

CredentialOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

export default withRouter(connect(mapStateToProps)(AdGroupsOrderForm))
