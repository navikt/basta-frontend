import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FormSubmitSpinner from './FormSubmitSpinner'
import { ErrorStripe } from './AlertStripe'
import { resetForm } from '../../containers/order/actionCreators'
export class SubmitButton extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    const {dispatch} = this.props
    dispatch(resetForm())
  }

  render() {
    const { formSubmitting, formError, disabled, onClick } = this.props
    const disabledClass = disabled ? 'disabled' : ''
    const handleClick = !disabled ? onClick : null

    if (formSubmitting) {
      return <FormSubmitSpinner message="Submitting order..." />
    }
    return (
      <React.Fragment>
        <div className="formComponentGrid formComponentField">
          <div className={`orderFormSubmitButton ${disabledClass}`} onClick={() => handleClick()}>
            Submit
          </div>
        </div>
        <div className="formComponentGrid formComponentField">
          <ErrorStripe show={formError !== null} message={formError} />
        </div>
      </React.Fragment>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    formSubmitting: state.order.form.submitting,
    formError: state.order.form.error
  }
}

export default withRouter(connect(mapStateToProps)(SubmitButton))
