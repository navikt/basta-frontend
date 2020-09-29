import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  QueueManagerDropDown,
  EnvironmentsDropDown,
  OrderDropDown,
  OperationsButtons
} from '../../commonUi/formComponents'
import { submitOperation } from '../operateActionCreators'
import { fetchMqQueues, clearMqQueues } from '../../common/actionCreators'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'

const mqImage = require('../../../img/orderTypes/mq.png')

const initialState = {
  environmentName: '',
  queueManager: '',
  mqQueueName: ''
}

export class MqQueueOperationsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, queueManager } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState(initialState)
      dispatch(clearMqQueues())
    }

    if (queueManager && prevState.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqQueues(environmentClass, queueManager))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqQueues())
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validForm() {
    const { environmentName, queueManager, mqQueueName } = this.state
    return environmentName.length > 0 && queueManager.length > 0 && mqQueueName.length > 0
  }

  submitHandler() {
    // Remove field environmentName from payload as this is not needed by basta api
    const { environmentName, ...payload } = this.state
    this.props.dispatch(submitOperation('mqqueue', payload))
  }

  render() {
    const { environmentName, environmentClass, queueManager, mqQueueName } = this.state
    const { queues, submitting, submitError } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ Queue operations</div>
            <div className="orderFormDescription">Delete</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={environmentClass}
              value={environmentName}
            />
            <QueueManagerDropDown
              onChange={v => this.handleChange('queueManager', v)}
              envClass={environmentClass}
              envName={environmentName}
              value={queueManager}
            />
            <OrderDropDown
              label="MQ queue name"
              value={mqQueueName}
              alternatives={queues}
              onChange={v => this.handleChange('mqQueueName', v)}
            />
            <OperationsButtons
              hasAccess={this.validForm()}
              onClick={this.submitHandler.bind(this)}
              submitting={submitting}
              hideStopButton={true}
              hideStartButton={true}
            />
            <div className="formComponentGrid formComponentField">
              <ErrorStripe show={submitError !== null} message={submitError} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error,
    queues: state.orderFormData.queues.data
  }
}

MqQueueOperationsForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(MqQueueOperationsForm)
