import React from 'react'
import { renderWithProviders } from '../../common/testUtils'
import { CredentialsOperationForm } from './CredentialsOperationForm'

const props = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'],
    },
  },
  existInAD: true,
  existInFasit: false,
}

describe('(Component) CredentialsOperationForm rendering', () => {
  it('Renders without exploding', () => {
    const { container } = renderWithProviders(
      <CredentialsOperationForm {...props} dispatch={() => {}} />,
      {
        state: {
          user: props.user,
          orderFormData: { applications: { data: [] } },
        },
      },
    )
    expect(container).toBeTruthy()
  })
})
