import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormSubmitSpinner from '../../../commonUi/formComponents/FormSubmitSpinner'
import { InfoStripe } from '../../../commonUi/formComponents/AlertStripe'

export class OperationsButtons extends Component {
  constructor(props) {
    super(props)
    this.state = { pendingConfirmation: false }
  }

  confirmDelete() {
    this.setState({ pendingConfirmation: false })
    this.props.onClick('delete')
  }

  handleClick(action) {
    if (this.props.hasAccess) {
      if (action === 'delete') {
        this.setState({ pendingConfirmation: true })
      } else {
        this.props.onClick(action)
      }
    }
  }

  showConfirmationMessage() {
    return (
      <InfoStripe show={this.state.pendingConfirmation}>
        <div>
          This will physically delete these resources. Hit confirm if this is what you want to do
        </div>
        <div className="disableNotification-btn" onClick={() => this.confirmDelete()}>
          Confirm
        </div>
      </InfoStripe>
    )
  }

  startButton() {
    const { hideStartButton } = this.props
    if (!hideStartButton) {
      return (
        <div className="start" onClick={() => this.handleClick('start')}>
          <span className="fa fa-play" /> Start
        </div>
      )
    }
  }

  stopButton() {
    const { hideStopButton } = this.props
    if (!hideStopButton) {
      return (
        <div className="stop" onClick={() => this.handleClick('stop')}>
          <span className="fa fa-pause" /> Stop
        </div>
      )
    }
  }

  deleteButton() {
    return (
      <div className="delete" onClick={() => this.handleClick('delete')}>
        <span className="fa fa-trash" /> Delete
      </div>
    )
  }

  render() {
    const { hasAccess, submitting } = this.props

    if (submitting) {
      return <FormSubmitSpinner message="Submitting..." />
    }

    const disabledClass = !hasAccess ? 'disabled' : ''

    return (
      <React.Fragment>
        <div className={`orderFormOperateButtons ${disabledClass}`}>
          {this.startButton()}
          {this.stopButton()}
          {this.deleteButton()}
        </div>
        {this.showConfirmationMessage()}
      </React.Fragment>
    )
  }
}

OperationsButtons.propTypes = {
  hasAccess: PropTypes.bool,
  formKey: PropTypes.string,
  formData: PropTypes.object,
  dispatch: PropTypes.func
}

export default OperationsButtons
