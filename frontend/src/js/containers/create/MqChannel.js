import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  ApplicationsDropDown
} from '../../common/components/formComponents'
import { connect } from 'react-redux'
import { submitForm } from '../../containers/order/actionCreators'

const mqImage = require('../../../img/orderTypes/mq.png')

export class MqChannel extends Component {
  constructor(props) {
    super(props)
    for (const key in orderFields) {
      orderFields[key].valid = true
      this.state = { ...this.state, [key]: orderFields[key].value }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, environmentName, channelName, applicationMappingName } = this.state
    if (prevState.environmentClass != environmentClass) {
      this.setState({
        environmentName: '',
        applicationMappingName: '',
        queueManager: '',
        channelName: '',
        alias: ''
      })
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ applicationMappingName: '', queueManager: '' })
    }
    if (
      prevState.channelName != channelName ||
      prevState.applicationMappingName != applicationMappingName
    ) {
      this.setState({
        channelName: `${environmentName.toUpperCase()}_${applicationMappingName.toUpperCase()}`,
        alias: `${applicationMappingName}_channel`
      })
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    const { environmentName, applicationMappingName, queueManager, channelName, alias } = this.state

    return (
      environmentName.length > 0 &&
      applicationMappingName.length > 0 &&
      queueManager.length > 0 &&
      channelName.length > 0 &&
      alias.length > 0
    )
  }

  render() {
    const { user, dispatch } = this.props
    const { name, environmentName, applicationMappingName } = this.state
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ</div>
            <div className="orderFormDescription">Channel</div>
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
            {environmentName && applicationMappingName ? (
              <div className={'subcomponents'}>
                <QueueManagerDropDown
                  key={'queueManager'}
                  label={orderFields.queueManager.label}
                  onChange={v => this.handleChange('queueManager', v)}
                  envClass={this.state.environmentClass}
                  envName={this.state.environmentName}
                  application={this.state.applicationMappingName}
                  value={this.state['queueManager']}
                />
                <OrderTextBox
                  key={'channelName'}
                  label={orderFields.channelName.label}
                  value={this.state['channelName']}
                  placeholder={orderFields.channelName.description}
                  onChange={v => this.handleChange('channelName', v)}
                />
                <OrderTextBox
                  key={'alias'}
                  label={orderFields.alias.label}
                  value={this.state['alias']}
                  onChange={v => this.handleChange('alias', v)}
                />
                <OrderCheckBox
                  key={'encrypted'}
                  label={orderFields.encrypted.label}
                  //defaultChecked={orderFields.encrypted.value}
                  value={this.state['encrypted']}
                  //value={false}
                  description={orderFields.encrypted.description}
                  onChange={v => this.handleChange('encrypted', v)}
                />
              </div>
            ) : null}
          </div>
          {this.validOrder() ? (
            <div
              className="orderFormSubmitButton"
              onClick={() => dispatch(submitForm('channel', this.state))}
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
  queueManager: {
    label: 'Queue manager',
    value: ''
  },
  alias: {
    label: 'Fasit alias',
    fieldType: 'text',
    value: ''
  },
  channelName: {
    label: 'Channel name',
    fieldType: 'text',
    value: ''
  },
  encrypted: {
    label: 'Encrypted connection',
    description: 'Adds TLS encryption on connection to MQ',
    value: false
  }
}
MqChannel.propTypes = {
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

export default connect(mapStateToProps)(MqChannel)
