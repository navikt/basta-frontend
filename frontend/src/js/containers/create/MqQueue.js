import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderNumberBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  ApplicationsDropDown
} from '../../common/components/formComponents'
import connect from 'react-redux/es/connect/connect'
import OrderDropDown from '../../common/components/formComponents/OrderDropDown'

const mqImage = require('../../../img/orderTypes/mq.png')

export class MqQueue extends Component {
  constructor(props) {
    super(props)
    for (const key in orderFields) {
      orderFields[key].valid = true
      this.state = { ...this.state, [key]: orderFields[key].value }
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    console.log(this.state.environmentClass)
    const { environmentClass, environmentName } = this.state
    if (prevState.environmentClass != environmentClass) {
      this.setState({ environmentName: '' })
      this.setState({ applicationMappingName: '' })
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ applicationMappingName: '' })
    }
  }

  handleChange(field, value) {
    const orderField = orderFields[field]
    if ((orderField.min && value < orderField.min) || value > orderField.max) {
      orderField.valid = false
    } else {
      orderField.valid = true
    }
    orderFields[field].value = value
    this.setState({ [field]: value })
  }

  validOrder() {
    for (const key in orderFields) {
      if (!orderFields[key].valid) return false
    }
    return true
  }

  render() {
    const { user } = this.props
    const { name, environmentName, applicationMappingName } = this.state
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ</div>
            <div className="orderFormDescription">Queue</div>
          </div>
          <div className="orderFormItems">
            <OrderButtonGroup
              label={orderFields.environmentClass.label}
              value={this.state['environmentClass']}
              roles={user.userProfile.roles}
              description={orderFields.environmentClass.description}
              alternatives={orderFields.environmentClass.alternatives}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              key={'environmentName'}
              label={orderFields.environmentName.label}
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={this.state.environmentClass}
              value={this.state['environmentName']}
            />
            <ApplicationsDropDown
              key={'applicationMappingName'}
              label={orderFields.applicationMappingName.label}
              onChange={v => this.handleChange('applicationMappingName', v)}
              value={this.state.applicationMappingName}
            />
            <OrderTextBox
              key={'name'}
              label={orderFields.name.label}
              value={this.state[name]}
              placeholder={orderFields.name.description}
              onChange={v => this.handleChange('name', v)}
            />
            <OrderDropDown
              key={'maxSize'}
              label={orderFields.maxSize.label}
              value={this.state.maxSize}
              alternatives={orderFields.maxSize.alternatives}
              onChange={v => this.handleChange('maxSize', v)}
            />
            {environmentName && applicationMappingName && name ? (
              <div>
                <QueueManagerDropDown
                  key={'queueName'}
                  label={orderFields.queueManager.label}
                  onChange={v => this.handleChange('queueName', v)}
                  envClass={this.state.environmentClass}
                  envName={this.state.environmentName}
                  application={this.state.applicationMappingName}
                  value={this.state['queueName']}
                />
                <OrderDropDown
                  key={'maxSize'}
                  label={orderFields.maxSize.label}
                  value={this.state.maxSize}
                  alternatives={orderFields.maxSize.alternatives}
                  onChange={v => this.handleChange('maxSize', v)}
                />
              </div>
            ) : null}
          </div>
          <div className="orderFormSubmitButton">Submit</div>
        </div>
      </div>
    )
  }
}

const orderFields = {
  environmentClass: {
    label: 'Env. class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p' }
    ],
    value: 'u'
  },
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  },
  applicationMappingName: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  name: {
    label: 'Queue name',
    description: 'Name of queue',
    value: ''
  },
  queueManager: {
    label: 'Queue manager',
    value: ''
  },
  maxSize: {
    label: 'Max size',
    alternatives: [
      { label: '4 Mb', value: '4' },
      { label: '10 MB', value: '10' },
      { label: '20 MB', value: '20' },
      { label: '100 MB', value: '100' }
    ],
    value: '4'
  },
  depth: {
    label: 'Queue depth',
    alternatives: [
      { label: '1000', value: '1000' },
      { label: '5000', value: '5000' },
      { label: '10 000', value: '10000' }
    ],
    value: '5000'
  }
}
MqQueue.propTypes = {
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

export default connect(mapStateToProps)(MqQueue)
