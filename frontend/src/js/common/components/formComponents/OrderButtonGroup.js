import React from 'react'
import PropTypes from 'prop-types'
import { isAvailable } from '../../utils'

export const OrderButtonGroup = props => {
  const { label, value, description, alternatives, roles, onChange } = props
  return (
    <div className="formComponentGrid">
      <div className="formComponentField">
        <label htmlFor="">
          <React.Fragment>
            {label}
            {description && description.length > 0 ? (
              <p className="formComponentButtonGroupDescription">{description}</p>
            ) : null}
          </React.Fragment>
        </label>
        <div className="formComponentButtonGroup">
          {alternatives.map((alt, idx) => {
            return isAvailable(alt.access, roles) ? (
              <button
                className={alt.value === value ? 'active' : null}
                key={idx}
                onClick={() => onChange(alt.value)}
              >
                {alt.label}
              </button>
            ) : (
              <button
                data-tip={'Requires permission: ' + alt.access}
                className={'disabled'}
                key={idx}
              >
                {alt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
OrderButtonGroup.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  alternatives: PropTypes.array,
  access: PropTypes.array,
  roles: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderButtonGroup
