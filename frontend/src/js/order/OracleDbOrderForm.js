import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderTextBox,
  EnvironmentsDropDown,
  ApplicationsDropDown
} from '../common/components/formComponents'
import SubmitButton from './formComponents/SubmitButton'
import { submitForm } from '../containers/order/actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EnvironmentClassButtonGroup from './formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from './formComponents/ZoneButtonGroup'
import OrderDbTemplateDropDown from './formComponents/OrderDbTemplateDropDown'
import { timeout } from 'q'

const oracleImage = require('../../img/orderTypes/oracle.png')

const initialState = {
  zone: 'fss',
  environmentName: '',
  applicationName: '',
  databaseName: '',
  fasitAlias: '',
  dbTemplate: {}
}

export class OracleDbOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass } = this.state
    if (prevState.environmentClass != environmentClass) {
      this.setState(initialState)
    }
    if (
      (this.state.applicationName !== prevState.applicationName ||
        this.state.environmentName !== prevState.environmentName) &&
      (this.state.environmentName && this.state.applicationName)
    ) {
      this.setSpecializedTexts()
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  setDbTemplate(template) {
    this.setState({ dbTemplate: { label: template.label, value: template.value } })
  }

  validOrder() {
    const { environmentName, applicationName, databaseName, fasitAlias, dbTemplate } = this.state
    return (
      environmentName.length > 0 &&
      applicationName.length > 0 &&
      databaseName.length > 0 &&
      fasitAlias.length > 0 &&
      dbTemplate.hasOwnProperty('value')
    )
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

  setSpecializedTexts() {
    const dbName = `${this.state.applicationName}_${this.state.environmentName}`
    this.setState({
      databaseName: this.trimToLength(this.removeIllegalCharacters(dbName.toUpperCase()), 28),
      fasitAlias: `${this.state.applicationName}DB`
    })
  }

  render() {
    const {
      environmentClass,
      zone,
      environmentName,
      applicationName,
      databaseName,
      fasitAlias,
      dbTemplate
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
            <ZoneButtonGroup value={zone} onChange={v => this.handleChange('zone', v)} />
            <EnvironmentsDropDown
              label="Environment"
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={environmentClass}
              value={environmentName}
            />
            <ApplicationsDropDown
              onChange={v => this.handleChange('applicationName', v)}
              value={applicationName}
            />
            <OrderTextBox
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
              label="Fasit alias"
              value={fasitAlias}
              onChange={v => this.handleChange('fasitAlias', v)}
            />
            <OrderDbTemplateDropDown
              onChange={template => this.setDbTemplate(template)}
              environmentClass={environmentClass}
              zone={zone}
              value={dbTemplate.label}
            />
            <SubmitButton
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm('oracle', this.state))}
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
