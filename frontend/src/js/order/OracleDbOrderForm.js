import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown,
  OrderDbTemplateDropDown
} from '../common/components/formComponents'
import SubmitButton from './formComponents/SubmitButton'
import { submitForm } from '../containers/order/actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EnvironmentClassButtonGroup from './formComponents/EnvironmentClassButtonGroup'

const oracleImage = require('../../img/orderTypes/oracle.png')

export class OracleDbOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      zone: 'fss',
      environmentName: '',
      applicationName: '',
      databaseName: '',
      fasitAlias: '',
      templateUri: ''
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    return false
  }

  trimToLength(string, length) {
    if (string.length <= length) {
      return string
    } else {
      return string.slice(0, length)
    }
  }

  removeIllegalCharacters(string) {
    return string.replace(/[^A-Za-z0-9_]/g, '')
  }

  setSpecializedTexts(prevState) {
    if (
      (this.state.applicationName !== prevState.applicationName ||
        this.state.environmentName !== prevState.environmentName) &&
      (this.state.environmentName && this.state.applicationName)
    ) {
      const dbName = `${this.state.applicationName}_${this.state.environmentName}`
      this.setState({
        databaseName: this.trimToLength(this.removeIllegalCharacters(dbName.toUpperCase()), 28),
        fasitAlias: `${this.state.applicationName}DB`
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.setSpecializedTexts(prevState)
    }
  }

  render() {
    const {
      environmentClass,
      zone,
      environmentName,
      applicationName,
      databaseName,
      fasitAlias,
      templateUri
    } = this.state
    const { dispatch } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={oracleImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Database</div>
            <div className="orderFormDescription">Oracle</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
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
              key="applicationName"
              label="Application"
              onChange={v => this.handleChange('applicationName', v)}
              value={applicationName}
            />
            <OrderTextBox
              key="databaseName"
              label="Database name"
              value={databaseName}
              onChange={v =>
                this.handleChange(
                  'databaseName',
                  this.trimToLength(this.removeIllegalCharacters(v.toUpperCase()), 28)
                )
              }
            />
            <OrderTextBox
              key="fasitAlias"
              label="Fasit alias"
              value={fasitAlias}
              onChange={v => this.handleChange('fasitAlias', v)}
            />
            <OrderDbTemplateDropDown
              key="templateUri"
              label="Database type"
              onChange={v => this.handleChange('templateUri', v)}
              value={templateUri}
            />
            <SubmitButton
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm(this.currentComponent, this.state))}
            />
          </div>
        </div>
      </div>
    )
  }
}

OracleDbOrderForm.propTypes = {
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(OracleDbOrderForm))
