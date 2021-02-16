import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApplicationsDropDown } from '../../commonUi/formComponents'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { InfoStripe } from '../../commonUi/formComponents/AlertStripe'
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
            <img src={adgroupsImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">AdGroups</div>
            <div className="orderFormDescription">for service groups</div>
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

AdGroupsOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

export default withRouter(connect(mapStateToProps)(AdGroupsOrderForm))
