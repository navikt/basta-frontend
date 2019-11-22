import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormSubmitSpinner from '../../../commonUi/formComponents/FormSubmitSpinner'
import {InfoStripe} from '../../../commonUi/formComponents/AlertStripe'

export class OperationsButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {pendingConfirmation: false}
  }

  confirmDelete() {
      this.setState({pendingConfirmation: false})
      this.props.onClick('delete')
  }

  showConfirmationMessage() {
    return (
        <InfoStripe show={this.state.pendingConfirmation}>
            <div>This will physically delete these resources. Hit confirm if this is what you want to do</div>  
            <div
                className="disableNotification-btn"
                onClick={() => this.confirmDelete()}
              >Confirm</div>
        </InfoStripe>
    )
  }

  render() {
    const { onClick, hasAccess, submitting } = this.props

    if (submitting) {
      return <FormSubmitSpinner message="Submitting..." />
    }

    if (hasAccess) {
      return (
        <React.Fragment>
        <div className="orderFormOperateButtons">
          <div className="start" onClick={() => onClick('start')}>
            <span className="fa fa-play" /> Start
          </div>
          <div className="stop" onClick={() => onClick('stop')}>
            <span className="fa fa-pause" /> Stop
          </div>
          <div className="delete" onClick={() => this.setState({pendingConfirmation: true})}>
            <span className="fa fa-trash" /> Delete
          </div>
        </div>
        {this.showConfirmationMessage()}
        </React.Fragment>
      )
    } else {
      return (
        <div className="orderFormOperateButtons disabled">
          <div className="start">
            <span className="fa fa-play" /> Start
          </div>
          <div className="stop">
            <span className="fa fa-pause" /> Stop
          </div>
          <div className="delete">
            <span className="fa fa-trash" /> Delete
          </div>
        </div>
      )
    }
  }
}

OperationsButtons.propTypes = {
  hasAccess: PropTypes.bool,
  formKey: PropTypes.string,
  formData: PropTypes.object,
  dispatch: PropTypes.func
}

export default OperationsButtons
