import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderCheckBox, OrderTextBox } from '../../commonUi/formComponents'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { submitCustomCredentialLookup } from '../../operations/operateActionCreators'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { ErrorStripe, InfoStripe } from '../../commonUi/formComponents/AlertStripe'
import { clearExistingCredentialMessage } from '../../common/actionCreators'
import { orderApiPath } from './configuration/customCredential'
import { logPageView } from '../../amplitude'

const certificateImage = require('../../../img/orderTypes/security.png')
const initialState = {
  username: '',
  zone: 'fss',
  abacAccess: false,
  stsAccess: false
}

export class CustomCredentialOrderForm extends Component {
  constructor(props) {
    logPageView('/create/customcredential')
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
    const { environmentClass, zone, username } = this.state
    const prevEnvClass = prevState.environmentClass
    const prevZone = prevState.zone
    const prevUsername = prevState.username
    const { dispatch } = this.props

    if (
      username !== '' &&
      (environmentClass !== prevEnvClass || zone !== prevZone || username !== prevUsername)
    ) {
      dispatch(submitCustomCredentialLookup(this.state))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearExistingCredentialMessage())
  }

  validOrder() {
    return !this.props.existInAD && this.state.username !== ''
  }

  render() {
    const { environmentClass, zone, username, abacAccess, stsAccess } = this.state
    const { dispatch, existInAD, formError, formSubmitting } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={certificateImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Custom credential</div>
            <div className="orderFormDescription">free text service users not in Fasit</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <ZoneButtonGroup value={zone} onChange={v => this.handleChange('zone', v)} />
            <OrderTextBox
              label="Username"
              value={username}
              placeholder={'Username starting with srv'}
              onChange={v => this.handleChange('username', v)}
            />
            <InfoStripe show={true}>
              <div className="alertStripeText">
                Password for this user will be saved in Vault. To get access to this user in vault,
                please read the{' '}
                <a href="https://github.com/navikt/vault-iac/blob/master/doc/service-users.md">
                  vault-iac documentation
                </a>
                <br /> <strong className="errorIcon">Nothing will be saved to fasit.</strong>
                <div>
                  If you need a serviceuser registered in fasit use the{' '}
                  <a href="/create/credential">credential order form</a>
                </div>
              </div>
            </InfoStripe>
            <OrderCheckBox
              label="ABAC"
              value={abacAccess}
              description="Adds user to ABAC pdp group in AD"
              onChange={v => this.handleChange('abacAccess', v)}
            />
            <OrderCheckBox
              label="STS"
              value={stsAccess}
              description="Gives user access to read from STS"
              onChange={v => this.handleChange('stsAccess', v)}
            />
            <ErrorStripe
              show={existInAD}
              message="User already exists in AD. Overwrite of custom service users is not supported. 
              If you want to recreate this user, first delete the existing user in the Operations menu. 
              Note that deleting an existing user will stop all other apps that are using it from working."
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

CustomCredentialOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error,
    existInAD: state.operationsForm.credentialLookup.data.existInAD
  }
}

export default withRouter(connect(mapStateToProps)(CustomCredentialOrderForm))
