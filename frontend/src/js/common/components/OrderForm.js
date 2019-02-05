import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderNumberBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown,
  OrderDbTemplateDropDown
} from './formComponents'
import orderTypes from '../../../configuration/'
import OrderDropDown from './formComponents/OrderDropDown'
import { submitForm } from '../../containers/order/actionCreators'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'

export class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.currentComponent = props.match.params.orderType
    this.configuration = orderTypes[this.currentComponent]
    this.orderFields = this.configuration.orderFields

    for (const key in this.orderFields) {
      this.orderFields[key].valid = true
      this.state = { ...this.state, [key]: this.orderFields[key].value }
    }
  }

  handleChange(field, value) {
    const orderField = this.orderFields[field]
    if (value < orderField.min || value > orderField.max) {
      orderField.valid = false
    } else {
      orderField.valid = true
    }
    this.orderFields[field].value = value
    this.setState({ [field]: value })
  }

  validOrder() {
    for (const key in this.orderFields) {
      if (!this.orderFields[key].valid) return false
    }
    return true
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
    // Specialized rules for oracle db order form
    if (
      this.state.nodeType === 'DB_ORACLE' &&
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
    const orderFields = this.orderFields
    const { dispatch } = this.props
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={this.configuration.image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">{this.configuration.title}</div>
            <div className="orderFormDescription">{this.configuration.description}</div>
          </div>
          <div className="orderFormItems">
            {Object.keys(orderFields).map(orderFieldKey => {
              const orderField = orderFields[orderFieldKey]
              switch (orderField.fieldType) {
                case 'number':
                  return (
                    <OrderNumberBox
                      key={orderFieldKey}
                      valid={orderField.valid}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      min={orderField.min}
                      max={orderField.max}
                      description={orderField.description}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                case 'text':
                  return (
                    <OrderTextBox
                      key={orderFieldKey}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      placeholder={orderField.description}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                //Field for oracle db with input formatting
                case 'databaseName':
                  return (
                    <OrderTextBox
                      key={orderFieldKey}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      placeholder={orderField.description}
                      onChange={v =>
                        this.handleChange(
                          orderFieldKey,
                          this.trimToLength(this.removeIllegalCharacters(v.toUpperCase()), 28)
                        )
                      }
                    />
                  )
                case 'checkBox':
                  return (
                    <OrderCheckBox
                      key={orderFieldKey}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      description={orderField.description}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                case 'buttonGroup':
                  return (
                    <OrderButtonGroup
                      key={orderFieldKey}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      description={orderField.description}
                      alternatives={orderField.alternatives}
                      roles={this.props.user.userProfile.roles}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                case 'environments':
                  return (
                    <EnvironmentsDropDown
                      key={orderFieldKey}
                      label={orderField.label}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                      environmentClass={this.state.environmentClass}
                      value={this.state[orderFieldKey]}
                    />
                  )
                case 'applications':
                  return (
                    <ApplicationsDropDown
                      key={orderFieldKey}
                      label={orderField.label}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                      value={this.state[orderFieldKey]}
                    />
                  )
                case 'dbTemplates':
                  return (
                    <OrderDbTemplateDropDown
                      key={orderFieldKey}
                      label={orderField.label}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                      value={this.state[orderFieldKey]}
                    />
                  )
                case 'dropDown':
                  return (
                    <OrderDropDown
                      key={orderFieldKey}
                      label={orderField.label}
                      value={this.state[orderFieldKey]}
                      description={orderField.description}
                      alternatives={orderField.alternatives}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                default:
                  if (orderField.fieldType) {
                    console.log(
                      'fieldType',
                      orderField.fieldType,
                      'is not a valid OrderForm component'
                    )
                  }
              }
            })}
          </div>
          {this.validOrder() ? (
            <div
              className="orderFormSubmitButton"
              onClick={() => dispatch(submitForm(this.currentComponent, this.state))}
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

OrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(OrderForm))
