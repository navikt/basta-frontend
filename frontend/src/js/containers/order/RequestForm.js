import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

const RequestForm = props => {
  const { data } = props
  return (
    <table className="requestForm">
      <tbody>
        {Object.keys(data).map(label => {
          return (
            <tr className="requestFormRow" key={label}>
              <td className="requestFormLabel">{label}</td>
              <td>{data[label]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

RequestForm.propTypes = {
  data: PropTypes.object
}

export default RequestForm
