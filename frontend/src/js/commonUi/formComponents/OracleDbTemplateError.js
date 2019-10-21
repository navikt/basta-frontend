import React from 'react'
import PropTypes from 'prop-types'
import { ErrorStripe } from './AlertStripe'

const OracleDbTemplateError = props => {
  const { error } = props

  if (error && error.length > 0) {
    return <ErrorStripe show={true} message={error} />
  } else {
    return null
  }
}

OracleDbTemplateError.propTypes = {
  error: PropTypes.string
}

export default OracleDbTemplateError
