import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import VirtualServersError from './VirtualServersError'
import { fetchVirtualServers } from '../../common/actionCreators'

export class VirtualServerDropDown extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.queryVirtualServers()
  }

  componentDidUpdate(prevProps) {
    const { environmentClass, environment, application, zone } = this.props
    if (
      prevProps.environmentClass != environmentClass ||
      prevProps.environment != environment ||
      prevProps.application != application ||
      prevProps.zone != zone
    ) {
      this.queryVirtualServers()
    }
  }

  queryVirtualServers() {
    const { dispatch, environmentClass, environment, application, zone } = this.props
    if (
      environmentClass.length > 0 &&
      environment.length > 0 &&
      application.length > 0 &&
      zone.length > 0
    ) {
      dispatch(fetchVirtualServers(environmentClass, environment, application, zone))
    }
  }

  render() {
    const { label, value, onChange, virtualServers, virtualServersError } = this.props

    return (
      <React.Fragment>
        <div className="formComponentGrid">
          <div className="formComponentField">
            <div className="formComponentDropdownField">
              <label htmlFor="">{label}</label>
              <Select
                options={mapToOptions(virtualServers)}
                value={value ? { label: value, value } : null}
                onChange={e => onChange(e.value)}
                isDisabled={virtualServers.length == 0}
              />
            </div>
          </div>
          <VirtualServersError error={virtualServersError} />
        </div>
      </React.Fragment>
    )
  }
}
const mapToOptions = alternatives => {
  return (
    alternatives.map(alt => {
      return { label: alt, value: alt }
    }) || []
  )
}

VirtualServerDropDown.propTypes = {
  environmentClass: PropTypes.string,
  environment: PropTypes.string,
  application: PropTypes.string,
  zone: PropTypes.string,
  onChange: PropTypes.func
}

const mapStateToProps = state => {
  return {
    virtualServers: state.orderFormData.virtualServers.data,
    virtualServersError: state.orderFormData.virtualServers.error
  }
}
export default connect(mapStateToProps)(VirtualServerDropDown)
