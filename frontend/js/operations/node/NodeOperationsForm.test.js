import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../common/testUtils'

jest.mock('./OperateNodeLookup', () => {
  const MockLookup = ({ onChange }) => (
    <div>
      <button
        type="button"
        onClick={() =>
          onChange({
            resolvedHosts: [
              { hostname: 'host1', validation: { valid: true } },
              { hostname: 'host2', validation: { valid: true } },
            ],
          })
        }
      >
        load-valid-hosts
      </button>
      <button
        type="button"
        onClick={() =>
          onChange({
            resolvedHosts: [
              { hostname: 'host1', validation: { valid: true } },
              { hostname: 'host2', validation: { valid: false } },
            ],
          })
        }
      >
        load-invalid-hosts
      </button>
    </div>
  )
  return { __esModule: true, default: MockLookup }
})

import { NodeOperationsForm } from './NodeOperationsForm'

const baseProps = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS'],
    },
  },
}

const renderForm = (overrideProps = {}, dispatch = jest.fn()) => {
  const utils = renderWithProviders(
    <NodeOperationsForm {...baseProps} {...overrideProps} dispatch={dispatch} />,
  )
  return { ...utils, dispatch }
}

describe('NodeOperationsForm rendering', () => {
  it('renders without exploding', () => {
    const { container } = renderForm()
    expect(container).toBeTruthy()
  })

  it('renders OperateNodeLookup, Start/Stop/Delete buttons', () => {
    renderForm()
    expect(screen.getByRole('button', { name: 'load-valid-hosts' })).toBeInTheDocument()
    expect(document.querySelector('.start')).toBeInTheDocument()
    expect(document.querySelector('.stop')).toBeInTheDocument()
    expect(document.querySelector('.delete')).toBeInTheDocument()
  })

  it('Start/Stop/Delete are gated as disabled until valid hosts are loaded', () => {
    renderForm()
    expect(document.querySelector('.orderFormOperateButtons.disabled')).toBeInTheDocument()
  })

  it('enables operations buttons when all resolved hosts are valid', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-valid-hosts' }))
    expect(document.querySelector('.orderFormOperateButtons.disabled')).not.toBeInTheDocument()
  })

  it('keeps operations buttons disabled when some resolved hosts are invalid', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-invalid-hosts' }))
    expect(document.querySelector('.orderFormOperateButtons.disabled')).toBeInTheDocument()
  })

  it('shows submitError ErrorStripe only after hosts are resolved', () => {
    const { rerender } = renderForm({ submitError: 'boom' })
    expect(screen.queryByText('boom')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'load-valid-hosts' }))
    expect(screen.getByText('boom')).toBeInTheDocument()
  })
})

describe('NodeOperationsForm logic', () => {
  it('Start dispatches SUBMIT_OPERATION with key=nodes, unique hostnames Set, operation=start', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-valid-hosts' }))
    fireEvent.click(document.querySelector('.start'))

    const submits = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'SUBMIT_OPERATION')
    expect(submits).toHaveLength(1)
    expect(submits[0]).toMatchObject({
      type: 'SUBMIT_OPERATION',
      key: 'nodes',
      operation: 'start',
    })
    expect(submits[0].form).toEqual(new Set(['host1', 'host2']))
  })

  it('Stop dispatches SUBMIT_OPERATION with operation=stop', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-valid-hosts' }))
    fireEvent.click(document.querySelector('.stop'))

    const submits = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'SUBMIT_OPERATION')
    expect(submits[0].operation).toBe('stop')
  })

  it('Delete requires confirmation, then dispatches SUBMIT_OPERATION with operation=delete', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-valid-hosts' }))
    fireEvent.click(document.querySelector('.delete'))

    expect(
      dispatch.mock.calls.map((c) => c[0]).filter((a) => a.type === 'SUBMIT_OPERATION'),
    ).toHaveLength(0)

    fireEvent.click(screen.getByText('Confirm'))

    const submits = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'SUBMIT_OPERATION')
    expect(submits).toHaveLength(1)
    expect(submits[0].operation).toBe('delete')
  })

  it('does not dispatch when invalid hosts are loaded and Start is clicked', () => {
    const { dispatch } = renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'load-invalid-hosts' }))
    fireEvent.click(document.querySelector('.start'))

    const submits = dispatch.mock.calls
      .map((c) => c[0])
      .filter((a) => a.type === 'SUBMIT_OPERATION')
    expect(submits).toHaveLength(0)
  })
})
