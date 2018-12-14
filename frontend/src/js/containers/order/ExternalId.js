import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
}

ExternalId.propTypes = {
  extId: PropTypes.string
}

export default ExternalId
