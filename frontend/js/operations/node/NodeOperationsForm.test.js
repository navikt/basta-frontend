import React from 'react'
import { renderWithProviders } from '../../common/testUtils'
import { NodeOperationsForm } from './NodeOperationsForm'

const props = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'],
    },
  },
}

describe('(Component) NodeOperationsForm rendering', () => {
  it('Renders without exploding', () => {
    const { container } = renderWithProviders(<NodeOperationsForm {...props} dispatch={() => {}} />)
    expect(container).toBeTruthy()
  })
})
