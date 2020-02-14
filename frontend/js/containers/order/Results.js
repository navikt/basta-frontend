import React from 'react'
import PropTypes from 'prop-types'
import OrderHistory from './OrderHistory'
//import history from '../../common/history'

function buildResultBody(data) {
  return (
    <div>
      {data.map(result => {
        return (
          <div className="resultLine" key={'resultline_' + result.id}>
            <div className="result">{createResultLine(result)}</div>
            <OrderHistory data={result.history} />
            {/*<div className="operations">
              {' '}
              <button
                disabled={true}
                className="button disabled"
                onClick={() => history.push(`/operations/node/${result.resultName}`)}
              >
                <i className="fa fa-wrench rightpad" />
              </button>
        </div>*/}
          </div>
        )
      })}
    </div>
  )
}

function vaultUrl(vaultPath) {
  const baseUrl = 'https://vault.adeo.no/ui/vault/secrets/'
  const replaced = vaultPath.replace(/^([\w-]+)\/data\/(.*)$/, '$1/show/$2')

  return baseUrl + replaced
}

function fasitUrl(resultName) {
  return `https://fasit.adeo.no/search?q=${resultName}`
}

function createResultLine(result) {
  if (result.details.vaultpath && result.details.vaultpath.length > 0) {
    return (
      <React.Fragment>
        <div className="result-info">
          <div>Name: </div>
          <div>{result.resultName}</div>
        </div>
        <div className="result-info">
          <div>Vaultpath:</div>
          <div>
            <a href={vaultUrl(result.details.vaultpath)} target="new">
              {result.details.vaultpath}
            </a>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="result-info">
        <div>Name: </div>
        <div>
          <a href={fasitUrl(result.resultName)}>{result.resultName}</a>
        </div>
      </div>
    </React.Fragment>
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