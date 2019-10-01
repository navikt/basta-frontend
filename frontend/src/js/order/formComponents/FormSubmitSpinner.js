import React, { Component } from 'react'
import PropTypes from 'prop-types'

const FormSubmitSpinner = props => {
  const { message } = props
  return (
    <div className="formComponentGrid formComponentField">
      <div className="submitSpinner">
        <i className="fa fa-spinner fa-spin "></i>
        <p>{message}</p>
      </div>
    </div>
  )
}

FormSubmitSpinner.propTypes = {
  message: PropTypes.string
}

export default FormSubmitSpinner
