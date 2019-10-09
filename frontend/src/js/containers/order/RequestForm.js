import React from 'react'
import PropTypes from 'prop-types'

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
