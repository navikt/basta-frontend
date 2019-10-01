import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FormSubmitSpinner from './FormSubmitSpinner'

export class SubmitButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { formSubmitting, disabled, onClick } = this.props
    const disabledClass = disabled ? 'disabled' : ''
    const handleClick = !disabled ? onClick : null

    if (formSubmitting) {
      return <FormSubmitSpinner message="Submitting order..." />
    }

    return (
      <div className="formComponentGrid formComponentField">
        <div className={`orderFormSubmitButton ${disabledClass}`} onClick={() => handleClick()}>
          Submit
        </div>
      </div>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting
  }
}

export default withRouter(connect(mapStateToProps)(SubmitButton))
