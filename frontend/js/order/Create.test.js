import React from 'react'
import { renderWithProviders } from '../common/testUtils'
import { Create } from './Create'

describe('Order filter function', () => {
  const user = {
    userProfile: {
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE1', 'ROLE2'],
    },
  }

  it('should return a list of all elements without exploding', () => {
    const { container } = renderWithProviders(<Create user={user} />)
    expect(container).toBeTruthy()
  })
})
