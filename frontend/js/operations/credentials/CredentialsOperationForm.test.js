import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../common/testUtils'

jest.mock('../../commonUi/formComponents', () => {
  const actual = jest.requireActual('../../commonUi/formComponents')
  const MockApplicationsDropDown = ({ value, onChange }) => (
    <div>
      <span data-testid="app-value">{value}</span>
      <button type="button" onClick={() => onChange('myapp')}>
        select-app
      </button>
    </div>
  )
  return { ...actual, ApplicationsDropDown: MockApplicationsDropDown }
})

import { CredentialsOperationForm } from './CredentialsOperationForm'

const baseProps = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'],
    },
  },
  existInAD: true,
  existInFasit: false,
}

const baseState = {
  user: baseProps.user,
  orderFormData: { applications: { data: [] } },
}

const renderForm = (overrideProps = {}, dispatch = jest.fn()) => {
  const utils = renderWithProviders(
    <CredentialsOperationForm {...baseProps} {...overrideProps} dispatch={dispatch} />,
    { state: baseState },
  )
  return { ...utils, dispatch }
}

describe('CredentialsOperationForm rendering', () => {
  it('renders without exploding', () => {
    const { container } = renderForm()
    expect(container).toBeTruthy()
  })

  it('renders ApplicationsDropDown and operations buttons', () => {
    renderForm()
    expect(screen.getByRole('button', { name: 'select-app' })).toBeInTheDocument()
    expect(document.querySelector('.delete')).toBeInTheDocument()
  })
})

describe('CredentialsOperationForm logic', () => {
  it('selecting an application dispatches CREDENTIAL_LOOKUP_REQUEST (componentDidUpdate)', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))

    const lookups = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'CREDENTIAL_LOOKUP_REQUEST')
    expect(lookups).toHaveLength(1)
    expect(lookups[0].form).toEqual({
      environmentClass: 'u',
      zone: 'fss',
      application: 'myapp',
    })
  })

  it('changing zone after selecting application triggers another CREDENTIAL_LOOKUP_REQUEST', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))
    fireEvent.click(screen.getByRole('button', { name: 'Selvbetjeningssone' }))

    const lookups = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'CREDENTIAL_LOOKUP_REQUEST')
    expect(lookups).toHaveLength(2)
    expect(lookups[1].form).toMatchObject({ zone: 'sbs', application: 'myapp' })
  })

  it('changing environment class after selecting application triggers CREDENTIAL_LOOKUP_REQUEST', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))
    fireEvent.click(screen.getByRole('button', { name: 'Test' }))

    const lookups = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'CREDENTIAL_LOOKUP_REQUEST')
    expect(lookups[lookups.length - 1].form).toMatchObject({
      environmentClass: 't',
      application: 'myapp',
    })
  })

  it('does not dispatch CREDENTIAL_LOOKUP_REQUEST when application is empty', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'Test' }))

    const lookups = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'CREDENTIAL_LOOKUP_REQUEST')
    expect(lookups).toHaveLength(0)
  })

  it('clicking Delete dispatches SUBMIT_OPERATION with key=credentials and current form', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))
    fireEvent.click(document.querySelector('.delete'))
    fireEvent.click(screen.getByText('Confirm'))

    const submits = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'SUBMIT_OPERATION')
    expect(submits).toHaveLength(1)
    expect(submits[0]).toMatchObject({
      type: 'SUBMIT_OPERATION',
      key: 'credentials',
      form: { environmentClass: 'u', zone: 'fss', application: 'myapp' },
    })
  })
})

describe('CredentialsOperationForm messages', () => {
  it('shows InfoStripe when user is missing from Fasit', () => {
    renderForm({ existInAD: true, existInFasit: false })
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))

    expect(
      screen.getByText(
        /Service user for myapp does not exist in fasit.*will only be deleted from AD/,
      ),
    ).toBeInTheDocument()
  })

  it('shows InfoStripe when user is missing from AD', () => {
    renderForm({ existInAD: false, existInFasit: true })
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))

    expect(
      screen.getByText(
        /Service user for myapp does not exist in AD.*will only be deleted from Fasit/,
      ),
    ).toBeInTheDocument()
  })

  it('shows ErrorStripe and disables submit when user missing from both AD and Fasit', () => {
    renderForm({ lookupComplete: true, existInAD: false, existInFasit: false })
    fireEvent.click(screen.getByRole('button', { name: 'select-app' }))

    expect(
      screen.getByText(
        /Service user for myapp does not exist in either AD or Fasit\. There is nothing to delete here\./,
      ),
    ).toBeInTheDocument()

    expect(document.querySelector('.orderFormOperateButtons.disabled')).toBeInTheDocument()
  })
})
