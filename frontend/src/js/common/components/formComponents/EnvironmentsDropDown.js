import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchEnvironments } from '../../actionCreators'

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
    const { label, value, onChange, description } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">{label}</div>
        <div className="formComponentField">
          <div className="formComponentDropdownField">
            <Select
              options={mapToOptions(this.state.filteredEnvironments)}
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
