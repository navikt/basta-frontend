import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { NodeOperationsForm } from './NodeOperationsForm'
import OperateNodeLookup from '../node/OperateNodeLookup'
import { OperationsButtons } from '../../commonUi/formComponents'
import { ErrorStripe } from '../../commonUi/formComponents/AlertStripe'

const props = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS']
    }
  }
}

describe('(Component) NodeOperationsForm logic', () => {
  let dispatch
  let wrapper
  const valueHasAccess = {
    resolvedHosts: [
      { hostname: 'host1', validation: { valid: true } },
      { hostname: 'host2', validation: { valid: true } }
    ]
  }
  const valueHasNotAccess = {
    resolvedHosts: [
      { hostname: 'host1', validation: { valid: true } },
      { hostname: 'host2', validation: { valid: false } }
    ]
  }

  beforeEach(() => {
    dispatch = sinon.spy()
    wrapper = shallow(<NodeOperationsForm {...props} dispatch={dispatch} />)
  })

  it('(handleChange) sets state with and determines access correctly', () => {
    wrapper.instance().handleChange(valueHasAccess)
    expect(wrapper.state().resolvedHosts).toBe(valueHasAccess.resolvedHosts)
    expect(wrapper.state().hasAccess).toBe(true)

    wrapper.instance().handleChange(valueHasNotAccess)
    expect(wrapper.state().hasAccess).toBe(false)
  })

  it('(hasAccessToAllHosts) returns true if all entries has access', () => {
    expect(wrapper.instance().hasAccessToAllHosts(valueHasAccess.resolvedHosts)).toBe(true)
  })

  it('(submitHandler) dispatches action with args', () => {
    const { resolvedHosts } = valueHasAccess
    const hostnames = resolvedHosts.map(host => host.hostname)
    wrapper.setState({ resolvedHosts })
    wrapper.instance().submitHandler('start')
    expect(dispatch.args[0][0].type).toBe('SUBMIT_OPERATION')
    expect(dispatch.args[0][0].key).toBe('nodes')
    expect(dispatch.args[0][0].form).toEqual(new Set(hostnames))
    expect(dispatch.args[0][0].operation).toBe('start')
  })
})

describe('(Component) CredentialsOperationForm rendering', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NodeOperationsForm {...props} />)
  })

  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  it('renders ErrorPanel once', () => {
    expect(wrapper.find(ErrorStripe)).toHaveLength(1)
  })

  it('renders OperationsButtons once', () => {
    expect(wrapper.find(OperationsButtons)).toHaveLength(1)
  })

  it('renders OperateNodeLookup once', () => {
    expect(wrapper.find(OperateNodeLookup)).toHaveLength(1)
  })
})
