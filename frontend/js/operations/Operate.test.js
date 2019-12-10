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
      tags: ['node', 'match'],
      url: '/operate/nodes'
    },
    {
      title: 'Credentials',
      description: 'Service user in AD',
      image: 'balls',
      tags: ['ad', 'miss'],
      url: '/operate/ad'
    }
  ]
  const wrapper = shallow(<Operate user={user} />)
  const instance = wrapper.instance()
  wrapper.setState({ orderTypes })

  it('should return a list of all elements without filter', () => {
    expect(instance.state.orderTypes.length).toBe(2)
  })

  it('changes state to contain only filtered elements', () => {
    instance.filterString('match')
    expect(instance.state.filteredOrders.length).toBe(1)
  })
})
