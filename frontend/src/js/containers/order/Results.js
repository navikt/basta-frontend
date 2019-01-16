import React from 'react'
import PropTypes from 'prop-types'
import OrderHistory from './OrderHistory'
import history from '../../common/history'

function buildResultBody(data) {
  return (
    <div>
      {data.map(result => {
        return (
          <div className="resultLine" key={'resultline_' + result.id}>
            <div className="result">{result.resultName}</div>
            <OrderHistory data={result.history} />

            <div className="operations">
              {' '}
              <button
                disabled={true}
                className="button disabled"
                onClick={() => history.push(`/operations/node/${result.resultName}`)}
              >
                <i className="fa fa-wrench rightpad" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Results = props => {
  const { data, type } = props
  return (
    <div className="results">
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="fa fa-server" /> Results
        </div>
        <div className="panel-body">{buildResultBody(data, type)}</div>
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
