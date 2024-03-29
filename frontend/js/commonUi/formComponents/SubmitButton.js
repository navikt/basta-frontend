import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FormSubmitSpinner from './FormSubmitSpinner'
import { ErrorStripe } from './AlertStripe'
import { resetForm } from '../../order/actionCreators'
export class SubmitButton extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    // do we need this??
    dispatch(resetForm())
  }

  render() {
    const { submitting, error, disabled, onClick } = this.props

    if (submitting) {
      return <FormSubmitSpinner message="Submitting order..." />
    }

    return (
      <React.Fragment>
        <div className="formComponentGrid formComponentField">
          {disabled ? (
            <div className={`orderFormSubmitButton disabled`}>Submit</div>
          ) : (
            <div className={`orderFormSubmitButton`} onClick={() => onClick()}>
              Submit
            </div>
          )}
        </div>
        <div className="formComponentGrid formComponentField">
          <ErrorStripe show={error !== null} message={error} />
        </div>
      </React.Fragment>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  submitting: PropTypes.bool
}

export default withRouter(connect()(SubmitButton))
