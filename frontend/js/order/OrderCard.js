import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const OrderCard = (props) => {
  const { label, description, image, url, access, enabled } = props
  return enabled ? (
    <Link to={url} className="orderCard">
      <div className="orderCardGrid">
        <div className="orderImage">
          <img src={image} />
        </div>
        <div className="orderLabel">{label}</div>
        <div className="orderDescription">{description}</div>
      </div>
    </Link>
  ) : (
    <div
      className="orderCard disabled"
      data-tooltip-id="orderCard-tooltip"
      data-tooltip-content={'missing permissions: ' + access}
    >
      <Tooltip id="orderCard-tooltip" />

      <div className="orderCardGrid">
        <div className="orderImage">
          <img src={image} />
        </div>
        <div className="orderLabel">{label}</div>
        <div className="orderDescription">{description}</div>
      </div>
    </div>
  )
}

OrderCard.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool,
}

export default OrderCard
