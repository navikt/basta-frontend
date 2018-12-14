import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../common/components/Spinner'
import MonitorButton from './MonitorButton'
import moment from 'moment'

const Log = props => {
  const { data, toggleMonitoring, monitoring, processing } = props

  function logBody(history) {
    return (
      <div>
        {history.sort((a, b) => b.id - a.id).map(event => {
          function buildEventStatus(status) {
            switch (status) {
              case 'info':
                return <span className="fa fa-info-circle" />
              case 'success':
                return <span className="fa fa-check-circle" />
              case 'error':
                return <span className="fa fa-warning" />
              case 'warning':
                return <span className="fa fa-flag" />
            }
          }

          return (
            <div key={'event_' + event.id} className={'logEvent ' + event.option}>
              <div className="status">{buildEventStatus(event.option)}</div>
              <div className="time">{moment(event.created).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className="text">{event.text}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return data.error ? (
    <div className="log">
      <div className="panel panel-error">
        <div className="panel-heading">Submitting form failed</div>
        <div className="panel-body">
          <div className="infobox">
            <div className="icon">
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
            </div>
            <div className="content">{data.error}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="log">
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="fa fa-history" /> Log
          {processing ? (
            <MonitorButton toggleMonitoring={toggleMonitoring} monitoring={monitoring} />
          ) : null}
        </div>
        {data.fetching ? <Spinner /> : logBody(data.data)}
      </div>
    </div>
  )
}

Log.propTypes = {
  data: PropTypes.object
}

export default Log
