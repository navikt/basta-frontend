import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ApplicationsDropDown } from '../../commonUi/formComponents'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import {
  certificateExistInFasit,
  clearExistingCertificateMessage
} from '../../common/actionCreators'
import { InfoStripe } from '../../commonUi/formComponents/AlertStripe'
import { orderApiPath } from './configuration/certificate'

const certificateImage = require('../../../img/orderTypes/security.png')
const initialState = {
  zone: 'fss',
  application: ''
}

export class CertificateOrderForm extends Component {
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
      dispatch(certificateExistInFasit(environmentClass, zone, application))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearExistingCertificateMessage())
  }

  validOrder() {
    return this.state.application !== ''
  }

  render() {
    const { environmentClass, zone, application } = this.state
    const { dispatch, certExistsInFasit, formError, formSubmitting } = this.props
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={certificateImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Certificate</div>
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
            <InfoStripe
              show={certExistsInFasit}
              message="Certificate already exists in fasit for this application in this environment class. If you create this one the existing certificate will be overwritten in Fasit."
            />
            <SubmitButton
              disabled={!this.validOrder()}
              error={formError}
              submitting={formSubmitting}
              onClick={() => dispatch(submitForm(this.state, orderApiPath))}
            />
          </div>
        </div>
      </div>
    )
  }
}

CertificateOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    certExistsInFasit: state.orderFormData.certificate.existsInFasit,
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

export default withRouter(connect(mapStateToProps)(CertificateOrderForm))
