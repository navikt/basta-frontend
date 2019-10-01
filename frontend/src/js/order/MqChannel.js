import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  ApplicationsDropDown
} from '../common/components/formComponents'
import { connect } from 'react-redux'
import { submitForm } from '../containers/order/actionCreators'
import SubmitButton from './formComponents/SubmitButton'

const mqImage = require('../../img/orderTypes/mq.png')

export class MqChannel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      environmentClass: 'u',
      environmentName: '',
      application: '',
      queueManager: '', 
      mqChannelName: '',
      fasitAlias: ''
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
              label="Env. class"
              value={environmentClass}
              roles={user.userProfile.roles}
              alternatives={[
                { label: 'development', value: 'u' },
                { label: 'test', value: 't' },
                { label: 'PreProd', value: 'q' },
                { label: 'Production', value: 'p' }
              ]}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              key={'environmentName'}
              label="Environment"
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={this.state.environmentClass}
              value={environmentName}
            />
            <ApplicationsDropDown
              key={'application'}
              label="Application"
              onChange={v => this.handleChange('application', v)}
              value={application}
            />
            {environmentName && application ? (
              <div className={'subcomponents'}>
                <QueueManagerDropDown
                  key={'queueManager'}
                  label="Queue manager"
                  onChange={v => this.handleChange('queueManager', v)}
                  envClass={environmentClass}
                  envName={environmentName}
                  application={application}
                  value={queueManager}
                />
                <OrderTextBox
                  key={'mqChannelName'}
                  label="Channel name"
                  value={mqChannelName}
                  onChange={v => this.handleChange('mqChannelName', v)}
                />
                <OrderTextBox
                  key={'fasitAlias'}
                  label="Fasit alias"
                  value={fasitAlias}
                  onChange={v => this.handleChange('fasitAlias', v)}
                />
                <OrderCheckBox
                  key={'encrypted'}
                  label="Encrypted connection"
                  value={encrypted}
                  description="Adds TLS encryption on connection to MQ"
                  onChange={v => this.handleChange('encrypted', v)}
                />
              </div>
            ) : null}
            <SubmitButton
              disabled={!this.validOrder()}
              onClick={() => dispatch(submitForm('channel', this.state))}
            />
          </div>
        </div>
      </div>
    )
  }
}

MqChannel.propTypes = {
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

export default connect(mapStateToProps)(MqChannel)
