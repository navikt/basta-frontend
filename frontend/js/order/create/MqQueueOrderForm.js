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
} from '../../commonUi/formComponents'
import OrderDropDown from '../../commonUi/formComponents/OrderDropDown'
import { submitForm } from '../actionCreators'
import { fetchMqClusters, clearMqClusters } from '../../common/actionCreators'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import { orderApiPath } from './configuration/queue'

const mqImage = require('../../../img/orderTypes/mq.png')

const initialState = {
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

export class MqQueueOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, environmentName, name, application, queueManager } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState(initialState)
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ application: '', queueManager: '' })
    }
    if (prevState.name != name || prevState.application != application) {
      const normalizedAppName = application.replace(new RegExp('-', 'g'), '_').toUpperCase()
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

  dispatchSubmit() {
    // Remove fields name and exposed from orders as this is not needed by basta api
    const { name, exposed, ...payload } = this.state
    this.props.dispatch(submitForm(payload, orderApiPath))
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
    const { formError, formSubmitting } = this.props
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
            <QueueManagerDropDown
              onChange={v => this.handleChange('queueManager', v)}
              envClass={environmentClass}
              envName={environmentName}
              application={application}
              value={queueManager}
            />
            <OrderTextBox
              label="Queue name"
              value={name}
              placeholder="Name of queue"
              onChange={v => this.handleChange('name', v)}
            />
            {environmentName && application && name ? (
              <div className={'subcomponents'}>
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
                    { label: '10 000', value: '10000' },
                    { label: '100 000', value: '100000' },
                    { label: '1 000 000', value: '1000000' },
                    { label: '2 000 000', value: '2000000' }
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
              error={formError}
              submitting={formSubmitting}
              disabled={!this.validOrder()}
              onClick={() => this.dispatchSubmit()}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

MqQueueOrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(MqQueueOrderForm)
