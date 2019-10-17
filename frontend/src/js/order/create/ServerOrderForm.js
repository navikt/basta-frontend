import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderNumberBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown
} from '../formComponents'
import SubmitButton from '../formComponents/SubmitButton'
import orderTypes from '../../../configuration'
import OrderDropDown from '../formComponents/OrderDropDown'
import { submitForm } from '../../containers/order/actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EnvironmentClassButtonGroup from '../formComponents/EnvironmentClassButtonGroup'
import ZoneButtonGroup from '../formComponents/ZoneButtonGroup'

export class ServerOrderForm extends Component {
  constructor(props) {
    super(props)
    this.currentComponent = props.match.params.orderType
    this.configuration = orderTypes[this.currentComponent]
    this.orderFields = this.configuration.orderFields

    this.state = this.initialState()
  }

  initialState() {
    let newState = {}

    for (const key in this.orderFields) {
      newState[key] = this.orderFields[key].value
    }

    return newState
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.environmentClass !== prevState.environmentClass) {
      const { environmentClass, ...newState } = this.initialState()
      this.setState(newState)
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    return Object.keys(this.orderFields)
      .filter(orderFieldKey => this.unvalidatableField(orderFieldKey))
      .map(orderFieldKey => this.isValidField(orderFieldKey))
      .reduce((accumulator, currentValue) => accumulator && currentValue)
  }

  unvalidatableField(orderFieldKey) {
    const fieldType = this.orderFields[orderFieldKey].fieldType
    return (
      fieldType !== undefined &&
      fieldType !== 'environmentClass' &&
      fieldType !== 'zone' &&
      fieldType !== 'buttonGroup' &&
      fieldType !== 'checkBox'
    )
  }

  isValidField(orderFieldKey) {
    const fieldType = this.orderFields[orderFieldKey].fieldType
    switch (fieldType) {
      case 'environments':
      case 'applications':
      case 'text':
        return this.state[orderFieldKey] !== ''
      case 'number':
        return (
          this.state[orderFieldKey] >= this.orderFields[orderFieldKey].min &&
          this.state[orderFieldKey] <= this.orderFields[orderFieldKey].max
        )
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
                case 'environmentClass':
                  return (
                    <EnvironmentClassButtonGroup
                      key={orderFieldKey}
                      value={this.state[orderFieldKey]}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                case 'zone': {
                  return (
                    <ZoneButtonGroup
                      key={orderFieldKey}
                      value={this.state[orderFieldKey]}
                      onChange={v => this.handleChange(orderFieldKey, v)}
                    />
                  )
                }
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
                      onChange={v => this.handleChange(orderFieldKey, v)}
                      environmentClass={this.state.environmentClass}
                      value={this.state[orderFieldKey]}
                    />
                  )
                case 'applications':
                  return (
                    <ApplicationsDropDown
                      key={orderFieldKey}
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

ServerOrderForm.propTypes = {
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

export default withRouter(connect(mapStateToProps)(ServerOrderForm))
