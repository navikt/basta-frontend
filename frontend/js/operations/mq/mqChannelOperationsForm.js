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
import { fetchMqChannels, clearMqChannels } from '../../common/actionCreators'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'

const mqImage = require('../../../img/orderTypes/mq.png')

const initialState = {
  environmentName: '',
  queueManager: '',
  mqChannelName: ''
}

export class MqChannelOperationsForm extends Component {
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
      dispatch(clearMqChannels())
    }

    if (queueManager && prevState.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqChannels(environmentClass, queueManager))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqChannels())
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validForm() {
    const { environmentName, queueManager, mqChannelName } = this.state
    return environmentName.length > 0 && queueManager.length > 0 && mqChannelName.length > 0
  }

  submitHandler() {
    this.props.dispatch(submitOperation('mqchannel', this.state))
  }

  render() {
    const { environmentName, environmentClass, queueManager, mqChannelName } = this.state
    const { channels, submitting, submitError } = this.props

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ Channel operations</div>
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
              label="MQ channel name"
              value={mqChannelName}
              alternatives={channels}
              onChange={v => this.handleChange('mqChannelName', v)}
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
    channels: state.orderFormData.channels.data
  }
}

MqChannelOperationsForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(MqChannelOperationsForm)
