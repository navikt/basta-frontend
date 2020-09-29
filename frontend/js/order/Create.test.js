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
      url: '/create/iapptools'
    },
    {
      title: 'Devillo Tools',
      description: 'Jenkins etc. in Devillo',
      image: 'balls',
      url: '/create/developertools'
    }
  ]
  const wrapper = shallow(<Create user={user} />)
  wrapper.setState({ orderTypes })

  it('should return a list of all elementsv without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
