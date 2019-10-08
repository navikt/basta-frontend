import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OrderButtonGroup } from '../../common/components/formComponents/OrderButtonGroup'

export class EnvironmentClassButtonGroup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onChange, value, user } = this.props
    return (
      <OrderButtonGroup
        key="environmentClass"
        label="Environment class 69"
        value={value}
        alternatives={[
          { label: 'Development', value: 'u' },
          { label: 'Test', value: 't' },
          { label: 'PreProd', value: 'q' },
          { label: 'Production', value: 'p', access: ['ROLE_PROD'] }
        ]}
        roles={user.userProfile.roles}
        onChange={v => onChange(v)}
      />
    )
  }
}

EnvironmentClassButtonGroup.propTypes = {
  dispatch: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(EnvironmentClassButtonGroup)
