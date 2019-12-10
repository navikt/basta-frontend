import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchScopedResources } from '../../common/actionCreators'

export class QueueManagerDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch, envClass, envName, application } = this.props
    dispatch(fetchScopedResources(envClass, envName, application))
  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, envName, envClass, application } = this.props
    if (
      prevProps.envName != envName ||
      prevProps.envClass != envClass ||
      prevProps.application != application
    ) {
      dispatch(fetchScopedResources(envClass, envName, application))
    }
  }

  render() {
    const { label, value, onChange, description, scopedresources } = this.props
    const options = mapToOptions(scopedresources)
    const selected = findOption(options, value)

    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">{label}</div>
        <div className="formComponentField">
          <div className="formComponentQueueManagerDropdownField">
            <Select options={options} value={selected} onChange={e => onChange(e.value)} />
            <div className="formComponentDescription">{description}</div>
          </div>
        </div>
      </div>
    )
  }
}
const mapToOptions = scopedResources => {
  let resources = {}
  scopedResources.forEach(res => {
    let hostname = res.properties.find(prop => {
      return prop.name === 'hostname'
    }).value
    let port = res.properties.find(prop => {
      return prop.name === 'port'
    }).value
    let name = res.properties.find(prop => {
      return prop.name === 'name'
    }).value
    let mqAddress = `mq://${hostname}:${port}/${name}`
    let key = hostname.replace(/\./g, '_')
    if (!resources[key]) {
      resources[key] = {}
      resources[key].aliases = []
      resources[key].hostname = mqAddress
      resources[key].name = name
    }
    resources[key].aliases.push(res.alias)
  })
  return Object.keys(resources).map(key => {
    const resource = resources[key]
    const aliasString = resource.aliases.join(', ')
    const label = `${resource.hostname} (${resource.name}) \n Fasit alias: ${aliasString}`
    return { label, value: resource.hostname, display: `${aliasString} (${resource.name})` }
  })
}
const findOption = (options, value) => {
  const selected = options.find(o => o.value === value)
  return selected ? { label: selected.display, value: selected.value } : null
}
QueueManagerDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    resources: state.orderFormData.resources.data,
    scopedresources: state.orderFormData.scopedresources.data
  }
}
export default connect(mapStateToProps)(QueueManagerDropDown)
