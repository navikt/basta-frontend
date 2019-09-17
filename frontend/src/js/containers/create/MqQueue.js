import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  MqClusterCheckBox,
  ApplicationsDropDown
} from '../../common/components/formComponents'
import OrderDropDown from '../../common/components/formComponents/OrderDropDown'
import { submitForm } from '../../containers/order/actionCreators'
import { fetchMqClusters, clearMqClusters } from '../../common/actionCreators'

const mqImage = require('../../../img/orderTypes/mq.png')

export class MqQueue extends Component {
  constructor(props) {
    super(props)
    for (const key in orderFields) {
      orderFields[key].valid = true
      this.state = { ...this.state, [key]: orderFields[key].value }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, environmentName, name, application, queueManager } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState({
        environmentName: '',
        application: '',
        queueManager: '',
        mqQueueName: '',
        fasitAlias: ''
      })
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ application: '', queueManager: '' })
    }
    if (prevState.name != name || prevState.application != application) {
      const normalizedAppName = application.replace('-', '_').toUpperCase()
      this.setState({
        mqQueueName: `${environmentName.toUpperCase()}_${normalizedAppName}.${name.toUpperCase()}`,
        fasitAlias: `${application}_${name}`
      })
    }
    if (queueManager && prevState.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqClusters(environmentClass, queueManager))
    }
  }

  exposeToCluster(exposeQueue) {
    if (exposeQueue) {
      this.setState({
        exposed: exposeQueue,
        clusterName: this.guessClusterName()
      })
    } else {
      this.setState({ exposed: exposeQueue })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqClusters())
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

  guessClusterName() {
    const { environmentClass, environmentName } = this.state
    if (environmentClass === 'u') {
      return 'NL.DEV.D1.CLUSTER'
    }
    const envs = {
      u: 'DEV',
      t: 'TEST',
      q: 'QASS',
      p: 'PROD'
    }
    return `NL.${envs[environmentClass]}.${environmentName.toUpperCase()}.CLUSTER`
  }

  render() {
    const { user, dispatch } = this.props
    const {
      environmentName,
      application,
      environmentClass,
      name,
      fasitAlias,
      queueManager,
      mqQueueName,
      maxMessageSize,
      queueDepth
    } = this.state

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
              environmentClass={environmentClass}
              value={this.state['environmentName']}
            />
            <ApplicationsDropDown
              key={'application'}
              label={orderFields.application.label}
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            <OrderTextBox
              key={'name'}
              label={orderFields.name.label}
              value={this.state[name]}
              placeholder={orderFields.name.description}
              onChange={v => this.handleChange('name', v)}
            />
            {environmentName && application && name ? (
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
                  key={'fasitAlias'}
                  label={orderFields.fasitAlias.label}
                  value={fasitAlias}
                  onChange={v => this.handleChange('fasitAlias', v)}
                />
                <OrderTextBox
                  key={'mqQueueName'}
                  label={orderFields.mqQueueName.label}
                  value={mqQueueName}
                  onChange={v => this.handleChange('mqQueueName', v)}
                />
                <OrderDropDown
                  key={'maxMessageSize'}
                  label={orderFields.maxMessageSize.label}
                  value={maxMessageSize}
                  alternatives={orderFields.maxMessageSize.alternatives}
                  onChange={v => this.handleChange('maxMessageSize', v)}
                />
                <OrderDropDown
                  key={'queueDepth'}
                  label={orderFields.queueDepth.label}
                  value={queueDepth}
                  alternatives={orderFields.queueDepth.alternatives}
                  onChange={v => this.handleChange('queueDepth', v)}
                />
                <OrderCheckBox
                  key={'createBackoutQueue'}
                  label={orderFields.createBackoutQueue.label}
                  value={this.state['createBackoutQueue']}
                  description={orderFields.createBackoutQueue.description}
                  onChange={v => this.handleChange('createBackoutQueue', v)}
                />
                <MqClusterCheckBox
                  queueManager={this.state.queueManager}
                  environmentClass={this.state.environmentClass}
                  clusterName={this.guessClusterName()}
                  environmentName={this.state.environmentName}
                  key={'exposed'}
                  label={orderFields.exposed.label}
                  value={this.state['exposed']}
                  description={orderFields.exposed.description}
                  onChange={v => this.exposeToCluster(v)}
                />
              </div>
            ) : null}
          </div>
          {this.validOrder() ? (
            <div
              className="orderFormSubmitButton"
              onClick={() => dispatch(submitForm('queue', this.state))}
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
  name: {
    label: 'Queue name',
    description: 'Name of queue',
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
  mqQueueName: {
    label: 'MQ queue name',
    fieldType: 'text',
    value: ''
  },
  maxMessageSize: {
    label: 'Max size',
    alternatives: [
      { label: '4 Mb', value: '4' },
      { label: '10 MB', value: '10' },
      { label: '20 MB', value: '20' },
      { label: '100 MB', value: '100' }
    ],
    value: '4'
  },
  queueDepth: {
    label: 'Queue depth',
    alternatives: [
      { label: '1000', value: '1000' },
      { label: '5000', value: '5000' },
      { label: '10 000', value: '10000' }
    ],
    value: '5000'
  },
  createBackoutQueue: {
    label: 'Backout queue',
    description: 'A queue for nondeliverable messages',
    value: false
  },
  exposed: {
    label: 'Expose to cluster',
    description: 'Will expose to all Queue Managers in cluster',
    value: false
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
