import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchMQQueueManagers, clearMqQueueManagers } from '../../common/actionCreators'

export class QueueManagerDropDown extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    const { dispatch, envName, envClass } = this.props

    if (envClass != prevProps.envClass) {
      dispatch(clearMqQueueManagers())
    }

    if (envName != '' && prevProps.envName != envName) {
      dispatch(fetchMQQueueManagers(envClass, envName))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqQueueManagers())
  }

  render() {
    const { value, onChange, description, resources } = this.props
    const options = mapToOptions(resources)
    const selected = findOption(options, value)

    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <label htmlFor="">Queue manager</label>
          <div className="formComponentQueueManagerDropdownField">
            <Select options={options} value={selected} onChange={e => onChange(e.value)} />
            <div className="formComponentDescription">{description}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapToOptions = resources =>
  Object.keys(resources).map(queueManagerName => {
    const queueManager = resources[queueManagerName]
    return {
      label: `${queueManagerName}\nFasit alias: ${Array.from(queueManager.aliases).join(', ')}`,
      value: queueManager.mqAddress
    }
  })

const findOption = (options, value) => {
  const selected = options.find(o => o.value === value)
  return selected ? { label: selected.label, value: selected.value } : null
}

QueueManagerDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    resources: state.orderFormData.resources.data
  }
}
export default connect(mapStateToProps)(QueueManagerDropDown)
