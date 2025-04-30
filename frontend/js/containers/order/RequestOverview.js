import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ExternalId from './ExternalId'

const RequestOverview = props => {
  const { data } = props
  return (
    <div className="overviewGrid">
      <div>{getOrderStatus(data.status)}</div>
      <div>
        <i className="fa fa-user rightpad" />
        {`${
          data.createdByDisplayName
            ? data.createdByDisplayName.split('@')[0].replace(new RegExp('\\.', 'g'), ' ')
            : 'Unknown'
        }`}
      </div>
      <div>
        <i className="fa fa-calendar rightpad" />
        {moment.unix(data.created).format('DD-MMM YYYY HH:mm:ss')}
      </div>
      <ExternalId extId={data.externalId} />
    </div>
  )
}

const getOrderStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return (
        <span className="badge success">
          {' '}
          <i className="fa fa-check" /> {status}
        </span>
      )
    case 'WARNING':
      return (
        <span className="badge warning">
          {' '}
          <i className="fa fa-flag" /> {status}
        </span>
      )
    case 'PROCESSING':
      return (
        <span className="badge info">
          {' '}
          <i className="fa fa-recycle" /> {status}
        </span>
      )
    case 'ERROR':
    case 'FAILURE':
      return (
        <span className="badge error">
          {' '}
          <i className="fa fa-exclamation-triangle" /> {status}
        </span>
      )
  }
  return <span> {status}</span>
}
RequestOverview.propTypes = {
  data: PropTypes.object
}

export default RequestOverview
