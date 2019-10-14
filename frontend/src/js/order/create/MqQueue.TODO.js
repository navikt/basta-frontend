import React from 'react'
import { shallow } from 'enzyme'
import { MqQueue } from './MqQueue'

describe('Order filter function', () => {
  const user = {
    userProfile: {
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE1', 'ROLE2']
    }
  }
  const wrapper = shallow(<MqQueue user={user} />)

  it('renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  it("shouldn't display all fields to start with", () => {
    expect(wrapper.find('.subcomponents').length).toBe(0)
  })
  it('should display all fields when environment, application and queuename has been specified', () => {
    wrapper.setState({ environmentName: 'a' })
    wrapper.setState({ applicationMappingName: 'b', name: 'c' })
    expect(wrapper.find('.subcomponents').length > 0).toBe(true)
  })
  it('should clear application when environment changes', () => {
    wrapper.setState({ environmentName: 'b' })
    expect(wrapper.state().applicationMappingName).toBe('')
  })
  it('should build mqName and alias', () => {
    wrapper.setState({ environmentName: 'a' })
    wrapper.setState({ applicationMappingName: 'b', name: 'c' })
    expect(wrapper.state().alias).toBe('b_c')
    expect(wrapper.state().mqName).toBe('A_B.C')
  })
  it('should clear application, environmentname, queuemanager and alias when environmentClass changes', () => {
    wrapper.setState({ environmentClass: 'x' })
    expect(wrapper.state().applicationMappingName).toBe('')
    expect(wrapper.state().environmentName).toBe('')
  })
})
