import React from 'react'
import ReactTooltip from 'react-tooltip'

import PropTypes from 'prop-types'

export const OrderTextBox = props => {
  const { label, value, onChange, description, placeholder } = props
  return (
    <div className="formComponentGrid">
      <div className="formComponentField">
        <label for="">{label}</label>
        <input
          className="formComponentTextField"
          type="text"
          placeholder={placeholder || 'description...'}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      <ReactTooltip />
    </div>
  )
}
OrderTextBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func
}

export default OrderTextBox
