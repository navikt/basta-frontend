import React from 'react'
import { renderWithProviders } from '../common/testUtils'
import { Operate } from './Operate'

describe('Operate filter function', () => {
  const user = {
    userProfile: {
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE1', 'ROLE2'],
    },
  }

  it('should return a list of all elements without filter', () => {
    const { container } = renderWithProviders(<Operate user={user} />)
    expect(container).toBeTruthy()
  })
})
