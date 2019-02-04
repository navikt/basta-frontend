import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchDbTemplates } from '../../actionCreators'

export class OrderDbTemplateDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDbTemplates('p', 'fss'))
  }

  render() {
    const { label, value, onChange, description, dbTemplates } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <div className="formComponentDropdownField">
            <label htmlFor="">{label}</label>
            <Select
              options={mapToOptions(dbTemplates)}
              value={value ? { label: value, value } : null}
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
    return { label: alt.description, value: alt.name }
  })
}
OrderDbTemplateDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    dbTemplates: state.orderFormData.dbTemplates.data
  }
}
export default connect(mapStateToProps)(OrderDbTemplateDropDown)
