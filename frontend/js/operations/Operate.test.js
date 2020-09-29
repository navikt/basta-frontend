import React from 'react'
import { shallow } from 'enzyme'
import { Operate } from './Operate'

describe('Operate filter function', () => {
  const user = {
    userProfile: {
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE1', 'ROLE2']
    }
  }
  const orderTypes = [
    {
      title: 'Nodes',
      description: 'Viartual machines',
      image: 'balls',
      url: '/operate/nodes'
    },
    {
      title: 'Credentials',
      description: 'Service user in AD',
      image: 'balls',
      url: '/operate/ad'
    }
  ]
  const wrapper = shallow(<Operate user={user} />)
  wrapper.setState({ orderTypes })

  it('should return a list of all elements without filter', () => {
    expect(wrapper.length).toBe(1)
  })
})
