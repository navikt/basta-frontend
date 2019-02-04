import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ReactTooltip from 'react-tooltip'

export const OrderDropDown = props => {
  const { label, description, value, alternatives, onChange } = props
  const options = mapToOptions(alternatives)
  return (
    <div className="formComponentGrid">
      <div className="formComponentField">
        <div className="formComponentDropdownField">
          <label htmlFor="">{label}</label>
          <Select
            options={options}
            value={findOption(options, value)}
            onChange={e => onChange(e.value)}
          />
          <div className="formComponentDescription">{description}</div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  )
}
const mapToOptions = alternatives => {
  return typeof alternatives[0] === 'object'
    ? alternatives
    : alternatives.map(alt => {
        return { label: alt, value: alt }
      })
}
const findOption = (options, value) => {
  return options.find(o => o.value === value)
}

OrderDropDown.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  alternatives: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderDropDown
