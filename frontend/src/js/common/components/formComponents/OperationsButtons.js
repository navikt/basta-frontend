import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class OperationsButtons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClick, hasAccess } = this.props

    if (hasAccess) {
      return (
        <div className="orderFormOperateButtons">
          <div className="start" onClick={() => onClick('start')}>
            <span className="fa fa-play" /> Start
          </div>
          <div className="stop" onClick={() => onClick('stop')}>
            <span className="fa fa-pause" /> Stop
          </div>
          <div className="delete" onClick={() => onClick('delete')}>
            <span className="fa fa-trash" /> Delete
          </div>
        </div>
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
