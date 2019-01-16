import React from 'react'
import PropTypes from 'prop-types'

const ExternalId = props => {
  const { extId } = props

  if (external && extId !== 'N/A') {
    return (
      <div className="externalId">
        <i className="fa fa-external-link rightpad" />
        {extId}
      </div>
    )
  }
  return null
}

ExternalId.propTypes = {
  extId: PropTypes.string
}

export default ExternalId
