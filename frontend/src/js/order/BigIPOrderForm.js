import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown,
  VirtualServerDropDown
} from '../common/components/formComponents'

import { submitForm } from '../containers/order/actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import image from '../../img/orderTypes/big-ip.png'
import AlertStripe from '../common/components/formComponents/AlertStripe';

export class BigIPOrderForm extends Component {
  initialState() {
    return {
      environmentClass: 'u',
      zone: 'fss',
      environmentName: '',
      application: '',
      virtualserver: '',
      matchingTypes: 'context',
      contextroots: '',
      hostname: ''
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState()
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
    const { dispatch } = this.props
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
          <AlertStripe message={"Load balancer config er ikke nødvendig hvis du har flyttet applikasjonen din til Nais."} show={true}/>  
            <OrderButtonGroup
              key="environmentClass"
              label="Environment class"
              value={environmentClass}
              alternatives={[
                { label: 'development', value: 'u' },
                { label: 'test', value: 't' },
                { label: 'PreProd', value: 'q' },
                { label: 'Production', value: 'p', access: ['ROLE_PROD'] }
              ]}
              roles={this.props.user.userProfile.roles}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <OrderButtonGroup
              key="zone"
              label="Zone"
              value={zone}
              alternatives={[
                { label: 'Fagsystemsone', value: 'fss' },
                { label: 'Selvbetjeningssone', value: 'sbs' }
              ]}
              roles={this.props.user.userProfile.roles}
              onChange={v => this.handleChange('zone', v)}
            />
            <EnvironmentsDropDown
              key="environmentName"
              label="Environment"
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={environmentClass}
              value={environmentName}
            />
            <ApplicationsDropDown
              key="application"
              label="Application"
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            <VirtualServerDropDown
              key="virtualserver"
              label="Virtual server"
              environmentClass={environmentClass}
              environment={environmentName}
              application={application}
              zone={zone}
              onChange={v => this.handleChange('virtualserver', v)}
              value={virtualserver}
            />
            <OrderButtonGroup
              key="matchingTypes"
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
              key="contextroots"
              label="Context root(s)"
              value={contextroots}
              disabled={matchingTypes === 'hostname'}
              placeholder="Add context roots"
              onChange={v => this.handleChange('contextroots', v)}
            />
            <OrderTextBox
              key="hostname"
              label="VS hostname / DNS"
              value={hostname}
              disabled={matchingTypes === 'context'}
              placeholder="Hostname of the virutal server"
              onChange={v => this.handleChange('hostname', v)}
            />
            <AlertStripe message="Bruk denne matching typen dersom du har kontroll på DNS som er i bruk. Hvis du er usikker, spør Marcel eller noen i #aura på Slack"  
            show={matchingTypes === 'hostname'}/>
          </div>
          {this.validOrder() ? (
            <div
              className="orderFormSubmitButton"
              onClick={() => dispatch(submitForm('bigip', this.state))}
            >
              Submit
            </div>
          ) : (
            <div className="orderFormSubmitButton disabled">Submit</div>
          )}
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
