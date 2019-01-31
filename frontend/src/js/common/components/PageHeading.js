import React from 'react'
import PropTypes from 'prop-types'

export const PageHeading = props => {
  const { icon, heading, description } = props
  const iconClasses = 'fa ' + icon + ' fa-stack-1x fa-inverse'
  return (
    <h3 className="pageHeading">
      <span className="fa-stack fa-lg">
        {' '}
        <i className="fa fa-circle fa-stack-2x" /> <i className={iconClasses} />{' '}
      </span>{' '}
      {heading}
      <small style={{ color: '#aaa', paddingLeft: '8px' }}>{description}</small>
    </h3>
  )
}

PageHeading.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string
}

export default PageHeading
