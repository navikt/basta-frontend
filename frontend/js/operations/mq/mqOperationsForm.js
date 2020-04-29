import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { OrderTextBox, QueueManagerDropDown } from '../../commonUi/formComponents'
import OrderDropDown from '../../commonUi/formComponents/OrderDropDown'
//import { submitForm } from '../actionCreators'
import { fetchMqQueues } from '../../common/actionCreators'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
//import { orderApiPath } from './configuration/queue'

const mqImage = require('../../../img/orderTypes/mq.png')

const initialState = {
  environmentName: '',
  //application: '',
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
    const { environmentClass, queueManager } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState(initialState)
    }

    /*if (prevState.name != name) {
      //const normalizedAppName = application.replace('-', '_').toUpperCase()
      this.setState({
        mqQueueName: `${environmentName.toUpperCase()}_${name}.${name.toUpperCase()}`,
        fasitAlias: `${application}_${name}`
      })
    }*/
    if (queueManager && prevState.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqQueues(environmentClass, queueManager))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    //dispatch(clearMqClusters())
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {
    const { environmentName, queueManager, mqQueueName } = this.state

    return (
      environmentName.length > 0 &&
      // application.length > 0 &&
      queueManager.length > 0 &&
      mqQueueName.length > 0
      // fasitAlias.length > 0
    )
  }

  dispatchSubmit() {
    // Remove fields name and exposed from orders as this is not needed by basta api
    const { name, exposed, ...payload } = this.state
    this.props.dispatch(submitForm(payload, orderApiPath))
  }

  render() {
    //const { formError, formSubmitting } = this.props
    const { environmentName, environmentClass, queueManager, mqQueueName } = this.state

    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ Queue operations</div>
            <div className="orderFormDescription">Start, stop and delete</div>
          </div>
          <div className="orderFormItems">
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <QueueManagerDropDown
              label="Queue manager"
              onChange={v => this.handleChange('queueManager', v)}
              envClass={environmentClass}
              envName={environmentName}
              //application={application}
              value={queueManager}
            />

            <OrderTextBox
              label={'MQ queue name'}
              value={mqQueueName}
              onChange={v => this.handleChange('mqQueueName', v)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    submitting: state.operationsForm.operations.fetching,
    submitError: state.operationsForm.operations.error
  }
}

MqQueueOrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(MqQueueOrderForm)
