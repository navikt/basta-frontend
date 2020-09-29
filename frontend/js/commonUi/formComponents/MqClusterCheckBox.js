import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class MqClusterCheckBox extends Component {
  constructor(props) {
    super(props)
  }

  buildDescription() {
    const { description, queueManager, clusters, clusterName } = this.props

    if (!queueManager) {
      return description
    }
    if (clusters.find(name => name === clusterName)) {
      return description + ' ' + clusterName
    }
    return null
  }
  render() {
    const { label, value, description, onChange, environmentName } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <label htmlFor="">{label}</label>
          <div className="formComponentCheckBoxContainer">
            {/*Need to have a dummy onchange handler on input element even though we handle change on span in order to avoid warning from Ract.  */}
            <input type="checkbox" checked={value} onChange={e => {}} />
            <span className="formComponentCheckBox" onClick={() => onChange(!value)} />
          </div>
          <div className="formComponentDescription">
            {this.buildDescription() ? (
              this.buildDescription()
            ) : (
              <div className="mqwarningContainer">
                {' '}
                <i className="fa fa-warning mqwarning" /> No cluster registered for{' '}
                {environmentName} on the selected queue manager
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

MqClusterCheckBox.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

const mapStateToProps = state => {
  return {
    clusters: state.orderFormData.clusters.data
  }
}
export default connect(mapStateToProps)(MqClusterCheckBox)
