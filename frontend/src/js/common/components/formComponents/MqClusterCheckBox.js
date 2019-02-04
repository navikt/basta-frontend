import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { fetchMqClusters, clearMqClusters } from '../../actionCreators'
import connect from 'react-redux/es/connect/connect'

export class MqClusterCheckBox extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps, prevState, SS) {
    const { dispatch, queueManager, environmentClass } = this.props
    if (queueManager && prevProps.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqClusters(environmentClass, queueManager))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqClusters())
  }

  guessClusterName() {
    const { environmentClass, environmentName } = this.props
    if (environmentClass === 'u') {
      return 'NL.DEV.D1.CLUSTER'
    }
    const envs = {
      u: 'DEV',
      t: 'TEST',
      q: 'QASS',
      p: 'PROD'
    }
    return `NL.${envs[environmentClass]}.${environmentName.toUpperCase()}.CLUSTER`
  }
  buildDescription() {
    const { description, queueManager, clusters } = this.props
    if (!queueManager) {
      return description
    }
    if (clusters.find(name => name === this.guessClusterName())) {
      return description
    }
    return null

    // clusters.find(name => name === this.guessClusterName()) ? 'found cluster' : description}
  }
  render() {
    const { label, value, description, onChange, environmentName } = this.props
    return (
      <div className="formComponentGrid">
        <div className="formComponentField">
          <label htmlFor="">{label}</label>
          <div className="formComponentCheckBoxContainer">
            <input type="checkbox" checked={value} />
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
        <ReactTooltip />
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
