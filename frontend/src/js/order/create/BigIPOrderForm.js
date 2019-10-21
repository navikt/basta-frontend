import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown
} from '../../commonUi/formComponents'
import VirtualServerDropDown from '../../commonUi/formComponents/VirtualServerDropDown'
import { submitForm } from '../actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import image from '../../../img/orderTypes/big-ip.png'
import { InfoStripe } from '../../commonUi/formComponents/AlertStripe'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../../commonUi/formComponents/ZoneButtonGroup'
import { orderApiPath } from './configuration/bigip'

const initialState = {
  zone: 'fss',
  environmentName: '',
  application: '',
  virtualserver: '',
  matchingTypes: 'context',
  contextroots: '',
  hostname: ''
}

export class BigIPOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.environmentClass !== prevState.environmentClass) {
      this.setState(initialState)
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    return (
      this.state.environmentName.length > 0 &&
      this.state.application.length > 0 &&
      this.state.virtualserver.length > 0 &&
      (this.state.contextroots.length > 0 || this.state.hostname.length > 0)
    )
  }

  dispatchSubmit() {
    // We need to transform local state to a format basta api accepts. Matching types field is only a conveinience when dealing with local state
    // it allows use the buttongroup component directly
    const { matchingTypes, ...formData } = this.state
    const payload = {
      ...formData,
      useHostnameMatching: matchingTypes === 'hostname' ? 'true' : 'false'
    }

    this.props.dispatch(submitForm('bigip', payload, orderApiPath))
  }

  render() {
    const {
      environmentClass,
      zone,
      environmentName,
      application,
      virtualserver,
      matchingTypes,
      contextroots,
      hostname
    } = this.state
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">BIG-IP</div>
            <div className="orderFormDescription">Load Balancer Config</div>
          </div>
          <div className="orderFormItems">
            <InfoStripe
              message={
                'Load balancer config er ikke nødvendig hvis du har flyttet applikasjonen din til Nais.'
              }
              show={true}
            />
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <ZoneButtonGroup value={zone} onChange={v => this.handleChange('zone', v)} />
            <EnvironmentsDropDown
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={environmentClass}
              value={environmentName}
            />
            <ApplicationsDropDown
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            <VirtualServerDropDown
              label="Virtual server"
              environmentClass={environmentClass}
              environment={environmentName}
              application={application}
              zone={zone}
              onChange={v => this.handleChange('virtualserver', v)}
              value={virtualserver}
            />
            <OrderButtonGroup
              label="Matching type"
              value={matchingTypes}
              alternatives={[
                { label: 'Context root', value: 'context' },
                { label: 'Hostname', value: 'hostname' }
              ]}
              roles={this.props.user.userProfile.roles}
              onChange={v => this.handleChange('matchingTypes', v)}
            />
            <OrderTextBox
              label="Context root(s)"
              value={contextroots}
              disabled={matchingTypes === 'hostname'}
              placeholder="Add context roots"
              onChange={v => this.handleChange('contextroots', v)}
            />
            <OrderTextBox
              label="VS hostname / DNS"
              value={hostname}
              disabled={matchingTypes === 'context'}
              placeholder="Hostname of the virutal server"
              onChange={v => this.handleChange('hostname', v)}
            />
            <InfoStripe
              message="Use hostname matching only if you have control over this DNS entry. If you are unsure what this means, ask Marcel or #aura on Slack"
              show={matchingTypes === 'hostname'}
            />
            <SubmitButton disabled={!this.validOrder()} onClick={() => this.dispatchSubmit()} />
          </div>
        </div>
      </div>
    )
  }
}

BigIPOrderForm.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(BigIPOrderForm))
