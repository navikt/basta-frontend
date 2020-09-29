import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import RequestOverview from './RequestOverview'
import RequestForm from './RequestForm'

export class Request extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'overview'
    }
  }
  render() {
    const { active } = this.state
    const { data } = this.props
    return (
      <div className="request">
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="fa fa-list-alt" /> Request
          </div>
          <div className="panel-body">
            <ul className="nav nav-tabs nav-request-tabs">
              <li className={active === 'overview' ? 'active' : null}>
                <a
                  onClick={e => {
                    e.preventDefault()
                    this.setState({ active: 'overview' })
                  }}
                >
                  <i className="fa fa-list-alt" />
                  &nbsp;&nbsp;Overview
                </a>
              </li>
              <li className={active === 'form' ? 'active' : null}>
                <a
                  onClick={e => {
                    e.preventDefault()
                    this.setState({ active: 'form' })
                  }}
                >
                  <i className="fa fa-list-alt" />
                  &nbsp;&nbsp;Form
                </a>
              </li>
            </ul>
            <div className="requestContainer">
              {active === 'overview' ? (
                <RequestOverview data={data} />
              ) : (
                <RequestForm data={data.input} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default Request
