import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApplicationsDropDown } from '../../commonUi/formComponents'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { submitGroupLookup } from '../../operations/operateActionCreators'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'
import { clearExistingGroupMessage } from '../../common/actionCreators'
import { orderApiPath } from './configuration/adgroups'

const adgroupsImage = require('../../../img/orderTypes/security.png')
const initialState = {
  zone: 'fss',
  application: '',
  groupUsage: 'MQ'
}

export class AdGroupsOrderForm extends Component {
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
      dispatch(submitGroupLookup(this.state))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearExistingGroupMessage())
  }

  validOrder() {
    return !this.props.existInAD && this.state.application !== ''
  }

  render() {
    const { environmentClass, zone, application } = this.state
    const { dispatch, existInAD, formError, formSubmitting } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={adgroupsImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AD Groups</div>
            <div className="orderFormDescription">for application groups</div>
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
              show={existInAD}
              message="Group already exists in AD. Overwrite of groups is not supported.
              Note that deleting an existing group will delete all members and settings in the group."
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

AdGroupsOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error,
    existInAD: state.operationsForm.grupLookup.data.existInAD
  }
}

export default withRouter(connect(mapStateToProps)(AdGroupsOrderForm))
