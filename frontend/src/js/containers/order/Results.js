import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const Results = props => {
  return (
    <div className="results">
      <div className="panel panel-info">
        <div className="panel-heading">
          <i className="fa fa-server" /> Results
        </div>
        <div className="panel-body" />
      </div>
    </div>
  )
}

Results.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default Results
