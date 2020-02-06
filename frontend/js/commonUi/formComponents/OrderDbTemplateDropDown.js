import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchDbTemplates } from '../../common/actionCreators'
import OracleDbTemplateError from './OracleDbTemplateError'

export class OrderDbTemplateDropDown extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, environmentClass, zone } = this.props
    dispatch(fetchDbTemplates(environmentClass, zone))
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, environmentClass, zone } = this.props

    if (prevProps.environmentClass != environmentClass || prevProps.zone != zone) {
      dispatch(fetchDbTemplates(environmentClass, zone))
    }
  }

  render() {
    const { value, onChange, dbTemplates, dbTemplatesFetchError } = this.props

    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <div className="formComponentDropdownField">
            <label htmlFor="">Database type</label>
            <Select
              options={mapToOptions(dbTemplates)}
              placeholder="Selct DB template"
              value={value ? { label: value } : null}
              onChange={e => onChange(e.value)}
            />
          </div>
        </div>
        <OracleDbTemplateError error={dbTemplatesFetchError} />
      </div>
    )
  }
}
const mapToOptions = alternatives => {
  return alternatives.map(alt => {
    return { label: alt.description, value: alt }
  })
}
OrderDbTemplateDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    dbTemplates: state.orderFormData.dbTemplates.data,
    dbTemplatesFetchError: state.orderFormData.dbTemplates.error
  }
}
export default connect(mapStateToProps)(OrderDbTemplateDropDown)
