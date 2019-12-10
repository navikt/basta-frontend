import React from 'react'
import { shallow } from 'enzyme'
import { Create } from './Create'

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
  const orderTypes = [
    {
      title: 'IApp Tools',
      description: 'Available via VPN',
      image: 'balls',
      tags: ['match'],
      url: '/create/iapptools'
    },
    {
      title: 'Devillo Tools',
      description: 'Jenkins etc. in Devillo',
      image: 'balls',
      tags: ['miss'],
      url: '/create/developertools'
    }
  ]
  const wrapper = shallow(<Create user={user} />)
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
