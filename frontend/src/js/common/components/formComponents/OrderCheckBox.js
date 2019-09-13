import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

export const OrderCheckBox = props => {
  const { label, value, description, onChange } = props
  return (
    <div className="formComponentGrid">
      <div className="formComponentField">
        <label htmlFor="">{label}</label>
        <div className="formComponentCheckBoxContainer">
          {/*Need to have a dummy onchange handler on input element even though we handle change on span in order to avoid warning from Ract.  */}
          <input type="checkbox" checked={value} onChange={e => {}} />
          <span className="formComponentCheckBox" onClick={() => onChange(!value)} />
        </div>
        <div className="formComponentDescription">{description}</div>
      </div>
      <ReactTooltip />
    </div>
  )
}
OrderCheckBox.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

export default OrderCheckBox
