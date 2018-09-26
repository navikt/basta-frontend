import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchApplications, fetchEnvironments } from '../../actionCreators'

export class ApplicationsDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchApplications())
  }

  render() {
    const { label, value, onChange, description, applications } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">{label}</div>
        <div className="formComponentField">
          <div className="formComponentDropdownField">
            <Select
              options={mapToOptions(applications)}
              setValue={value}
              onChange={e => onChange(e.value)}
            />
            <div className="formComponentDescription">{description}</div>
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}
const mapToOptions = alternatives => {
  return alternatives.map(alt => {
    return { label: alt, value: alt }
  })
}
ApplicationsDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    applications: state.orderFormData.applications.data
  }
}
export default connect(mapStateToProps)(ApplicationsDropDown)
