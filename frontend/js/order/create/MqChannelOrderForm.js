import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderTextBox,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  ApplicationsDropDown
} from '../../commonUi/formComponents'
import { connect } from 'react-redux'
import { submitForm } from '../actionCreators'
import SubmitButton from '../../commonUi/formComponents/SubmitButton'
import EnvironmentClassButtonGroup from '../../commonUi/formComponents/EnvironmentClassButtonGroup'
import { orderApiPath } from './configuration/channel'

const mqImage = require('../../../img/orderTypes/mq.png')

const initialState = {
  environmentName: '',
  application: '',
  queueManager: '',
  mqChannelName: '',
  fasitAlias: ''
}

export class MqChannelOrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      ...initialState
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { environmentClass, environmentName, mqChannelName, application } = this.state
    if (prevState.environmentClass != environmentClass) {
      this.setState(initialState)
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
    const { dispatch, formError, formSubmitting } = this.props
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
            <EnvironmentClassButtonGroup
              value={environmentClass}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={this.state.environmentClass}
              value={environmentName}
            />
            <ApplicationsDropDown
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            {environmentName && application ? (
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
                  label="Channel name"
                  value={mqChannelName}
                  onChange={v => this.handleChange('mqChannelName', v)}
                />
                <OrderTextBox
                  label="Fasit alias"
                  value={fasitAlias}
                  onChange={v => this.handleChange('fasitAlias', v)}
                />
                <OrderCheckBox
                  label="Encrypted connection"
                  value={encrypted}
                  description="Adds TLS encryption on connection to MQ"
                  onChange={v => this.handleChange('encrypted', v)}
                />
              </div>
            ) : null}
            <SubmitButton
              error={formError}
              submitting={formSubmitting}
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm(this.state, orderApiPath))}
            />
          </div>
        </div>
      </div>
    )
  }
}

MqChannelOrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

export default connect(mapStateToProps)(MqChannelOrderForm)
