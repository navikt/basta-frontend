import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderTextBox, OrderButtonGroup, ApplicationsDropDown } from './formComponents'
import orderTypes from '../../../configuration/'
import OrderDropDown from './formComponents/OrderDropDown'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { submitOperation } from '../../common/actionCreators'
import OperationsButtons from './formComponents/OperationsButtons'

export class OperationsForm extends Component {
  constructor(props) {
    super(props)
    this.currentComponent = props.match.params.orderType
    this.configuration = orderTypes[this.currentComponent]
    this.orderFields = this.configuration.orderFields

    for (const key in this.orderFields) {
      this.state = { ...this.state, [key]: this.orderFields[key].value }
    }
  }

  handleChange(field, value) {
    this.orderFields[field].value = value
    this.setState({ [field]: value })
  }

  submitHandler(operationsType) {
    // todo for other operations such as mq and channels
    const { dispatch } = this.props
    dispatch(submitOperation('nodes', this.state, operationsType))
  }

  doesUserHaveRole(role) {
    if (this.props.user.userProfile.roles.includes(role)) return true
    return false
  }

  render() {
    const orderFields = this.orderFields
    //const { dispatch } = this.props
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

                case 'applications':
                  return (
                    <ApplicationsDropDown
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
          <OperationsButtons
            hasAccess={this.doesUserHaveRole(this.state.requiredAccess)}
            onClickHandler={() => submitHandler}
          />
        </div>
      </div>
    )
  }
}

OperationsForm.propTypes = {
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

export default withRouter(connect(mapStateToProps)(OperationsForm))
