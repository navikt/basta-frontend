import React from 'react'
import { shallow } from 'enzyme'
import { MqChannel } from './MqChannel'

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
  const wrapper = shallow(<MqChannel user={user} />)

  it('renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  it("shouldn't display all fields to start with", () => {
    expect(wrapper.find('.subcomponents').length).toBe(0)
  })
  it('should display all fields when environment and application has been selected', () => {
    wrapper.setState({ environmentName: 'a' })
    wrapper.setState({ applicationMappingName: 'b' })
    expect(wrapper.find('.subcomponents').length > 0).toBe(true)
  })
  it('should clear application when environment changes', () => {
    wrapper.setState({ environmentName: 'b' })
    expect(wrapper.state().applicationMappingName).toBe('')
  })
})
