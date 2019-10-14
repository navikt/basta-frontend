import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchEnvironments } from '../../common/actionCreators'

export class EnvironmentsDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredEnvironments: []
    }
  }
  componentDidMount() {
    const { dispatch, environmentClass, environments } = this.props
    dispatch(fetchEnvironments())
    let filteredEnvironments = this.filterEnvironments(environments, environmentClass)
    this.setState({ filteredEnvironments })
  }
  componentDidUpdate(prevProps, prevState, ss) {
    const { environmentClass, environments } = this.props
    if (environments != prevProps.environments || environmentClass != prevProps.environmentClass) {
      let filteredEnvironments = this.filterEnvironments(environments, environmentClass)
      this.setState({ filteredEnvironments })
    }
  }
  filterEnvironments(environments, envClass) {
    return environments
      .filter(env => {
        return env.envClass === envClass
      })
      .map(env => {
        return env.name
      })
  }

  render() {
    const { value, onChange } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <label htmlFor="">Environment</label>
          <div className="formComponentDropdownField">
            <Select
              options={mapToOptions(this.state.filteredEnvironments)}
              value={value ? { label: value, value } : null}
              onChange={e => onChange(e.value)}
            />
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
EnvironmentsDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    environments: state.orderFormData.environments.data
  }
}
export default connect(mapStateToProps)(EnvironmentsDropDown)
