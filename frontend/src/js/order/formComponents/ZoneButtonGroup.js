import React from 'react'
import PropTypes from 'prop-types'
import { OrderButtonGroup } from '../../common/components/formComponents/OrderButtonGroup'

const ZoneButtonGroup = props => {
  const { value, onChange } = props
  return (
    <OrderButtonGroup
      key="zone"
      label="Zone"
      value={value}
      alternatives={[
        { label: 'Fagsystemsone', value: 'fss' },
        { label: 'Selvbetjeningssone', value: 'sbs' }
      ]}
      onChange={v => onChange(v)}
    />
  )
}

ZoneButtonGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default ZoneButtonGroup
