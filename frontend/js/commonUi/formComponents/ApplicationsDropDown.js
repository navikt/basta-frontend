import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchApplications } from '../../common/actionCreators'

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
        <div className="formComponentField">
          <label htmlFor="">Application</label>
          <div className="formComponentDropdownField">
            <Select
              options={mapToOptions(applications)}
              value={value ? { label: value, value } : null}
              onChange={e => onChange(e.value)}
            />
            <div className="formComponentDescription">{description}</div>
          </div>
        </div>
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
