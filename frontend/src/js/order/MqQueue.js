import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderTextBox,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  MqClusterCheckBox,
  ApplicationsDropDown
} from '../common/components/formComponents'
import OrderDropDown from '../common/components/formComponents/OrderDropDown'
import { submitForm } from '../containers/order/actionCreators'
import { fetchMqClusters, clearMqClusters } from '../common/actionCreators'
import SubmitButton from './formComponents/SubmitButton'
import EnvironmentClassButtonGroup from './formComponents/EnvironmentClassButtonGroup'

const mqImage = require('../../img/orderTypes/mq.png')

export class MqQueue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      environmentName: '',
      application: '',
      name: '',
      queueManager: '',
      mqQueueName: '',
      fasitAlias: '',
      maxMessageSize: '4',
      queueDepth: '5000',
      createBackoutQueue: false,
      exposed: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, environmentName, name, application, queueManager } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState({
        environmentName: '',
        application: '',
        name: '',
        queueManager: '',
        mqQueueName: '',
        fasitAlias: '',
        maxMessageSize: '4',
        queueDepth: '5000',
        createBackoutQueue: false,
        exposed: false
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
    this.setState({ [field]: value })
  }

  validOrder() {
    const { environmentName, application, queueManager, mqQueueName, fasitAlias } = this.state

    return (
      environmentName.length > 0 &&
      application.length > 0 &&
      queueManager.length > 0 &&
      mqQueueName.length > 0 &&
      fasitAlias.length > 0
    )
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

    let environmentDesignator = ''

    if (environmentName === 'p') {
      environmentDesignator = 'P1'
    } else {
      environmentDesignator = environmentName.toUpperCase()
    }

    return `NL.${envs[environmentClass]}.${environmentDesignator}.CLUSTER`
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
      queueDepth,
      createBackoutQueue,
      exposed
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
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={environmentClass}
              value={this.state['environmentName']}
            />
            <ApplicationsDropDown
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            <OrderTextBox
              label="Queue name"
              value={this.state[name]}
              placeholder="Name of queue"
              onChange={v => this.handleChange('name', v)}
            />
            {environmentName && application && name ? (
              <div className={'subcomponents'}>
                <QueueManagerDropDown
                  label="Queue manager"
                  onChange={v => this.handleChange('queueManager', v)}
                  envClass={environmentClass}
                  envName={environmentName}
                  application={application}
                  value={queueManager}
                />
                <OrderTextBox
                  label="Fasit alias"
                  value={fasitAlias}
                  onChange={v => this.handleChange('fasitAlias', v)}
                />
                <OrderTextBox
                  label={'MQ queue name'}
                  value={mqQueueName}
                  onChange={v => this.handleChange('mqQueueName', v)}
                />
                <OrderDropDown
                  label="Max size"
                  value={maxMessageSize}
                  alternatives={[
                    { label: '4 Mb', value: '4' },
                    { label: '10 MB', value: '10' },
                    { label: '20 MB', value: '20' },
                    { label: '100 MB', value: '100' }
                  ]}
                  onChange={v => this.handleChange('maxMessageSize', v)}
                />
                <OrderDropDown
                  label="Queue depth"
                  value={queueDepth}
                  alternatives={[
                    { label: '1000', value: '1000' },
                    { label: '5000', value: '5000' },
                    { label: '10 000', value: '10000' }
                  ]}
                  onChange={v => this.handleChange('queueDepth', v)}
                />

                <OrderCheckBox
                  label="Backout queue"
                  value={createBackoutQueue}
                  description="A queue for nondeliverable messages"
                  onChange={v => this.handleChange('createBackoutQueue', v)}
                />
                <MqClusterCheckBox
                  queueManager={this.state.queueManager}
                  environmentClass={this.state.environmentClass}
                  clusterName={this.guessClusterName()}
                  environmentName={this.state.environmentName}
                  label="Expose to cluster"
                  value={exposed}
                  description="Will expose to all Queue Managers in cluster"
                  onChange={v => this.exposeToCluster(v)}
                />
              </div>
            ) : null}
            <SubmitButton
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm('queue', this.state))}
            />
          </div>
        </div>
      </div>
    )
  }
}

MqQueue.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(MqQueue)
