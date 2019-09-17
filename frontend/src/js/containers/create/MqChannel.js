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
    const { environmentClass, environmentName, mqChannelName, application } = this.state
    if (prevState.environmentClass != environmentClass) {
      this.setState({
        environmentName: '',
        application: '',
        queueManager: '',
        mqChannelName: '',
        fasitAlias: ''
      })
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ application: '', queueManager: '' })
    }
    if (prevState.mqChannelName != mqChannelName || prevState.application != application) {
      const normalizedAppName = application.replace('-', '_').toUpperCase()
      this.setState({
        mqChannelName: `${environmentName.toUpperCase()}_${normalizedAppName}`,
        fasitAlias: `${application}_channel`
      })
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    const { environmentName, application, queueManager, mqChannelName, fasitAlias } = this.state

    return (
      environmentName.length > 0 &&
      application.length > 0 &&
      queueManager.length > 0 &&
      mqChannelName.length > 0 &&
      fasitAlias.length > 0
    )
  }

  render() {
    const { user, dispatch } = this.props
    const {
      environmentName,
      environmentClass,
      application,
      queueManager,
      mqChannelName,
      fasitAlias,
      encrypted
    } = this.state
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
              value={environmentClass}
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
              value={environmentName}
            />
            <ApplicationsDropDown
              key={'application'}
              label={orderFields.application.label}
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            {environmentName && application ? (
              <div className={'subcomponents'}>
                <QueueManagerDropDown
                  key={'queueManager'}
                  label={orderFields.queueManager.label}
                  onChange={v => this.handleChange('queueManager', v)}
                  envClass={environmentClass}
                  envName={environmentName}
                  application={application}
                  value={queueManager}
                />
                <OrderTextBox
                  key={'mqChannelName'}
                  label={orderFields.mqChannelName.label}
                  value={mqChannelName}
                  placeholder={orderFields.mqChannelName.description}
                  onChange={v => this.handleChange('mqChannelName', v)}
                />
                <OrderTextBox
                  key={'fasitAlias'}
                  label={orderFields.fasitAlias.label}
                  value={fasitAlias}
                  onChange={v => this.handleChange('fasitAlias', v)}
                />
                <OrderCheckBox
                  key={'encrypted'}
                  label={orderFields.encrypted.label}
                  value={encrypted}
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
  application: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  queueManager: {
    label: 'Queue manager',
    value: ''
  },
  fasitAlias: {
    label: 'Fasit alias',
    fieldType: 'text',
    value: ''
  },
  mqChannelName: {
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
