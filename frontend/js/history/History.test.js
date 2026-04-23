import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { History } from './History'
import { HISTORY_REQUEST, SEARCH_ORDERS_REQUEST } from '../actionTypes'

const makeOrder = (id, status = 'SUCCESS') => ({
  id,
  created: 1534318234218,
  createdBy: 'testuser',
  updated: 1534318234218,
  updatedBy: 'testuser',
  updatedByDisplayName: 'Test User',
  createdByDisplayName: 'Test User',
  orderType: 'VM',
  results: [],
  input: null,
  externalId: 'N/A',
  uri: `https://basta.adeo.no/rest/orders/${id}`,
  status,
  errorMessage: null,
  orderDescription: 'WILDFLY',
  orderOperation: 'CREATE',
  nextOrderId: null,
  previousOrderId: null,
  resultDetails: [],
})

const defaultProps = {
  filterApplied: false,
  searchProcessing: false,
  orderHistoryReceived: true,
  totalOrders: 8,
  orderHistory: Array.from({ length: 8 }, (_, i) => makeOrder(1000 + i)),
}

const renderHistory = (props = {}, dispatch = jest.fn()) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <History {...defaultProps} {...props} dispatch={dispatch} />
    </MemoryRouter>,
  )

describe('History rendering', () => {
  it('renders without throwing', () => {
    renderHistory()
  })

  it('renders the search input via HistoryFilter', () => {
    renderHistory()
    expect(screen.getByPlaceholderText('Search orders...')).toBeInTheDocument()
  })

  it('renders all orders when count is within maxResults', () => {
    renderHistory()
    expect(screen.getAllByRole('link')).toHaveLength(8)
  })

  it('slices orderHistory to maxResults (default 20) when more orders exist', () => {
    const orders = Array.from({ length: 25 }, (_, i) => makeOrder(2000 + i))
    renderHistory({ orderHistory: orders, totalOrders: 25 })
    expect(screen.getAllByRole('link')).toHaveLength(20)
  })

  it('shows filter result counter when filterApplied', () => {
    renderHistory({ filterApplied: true, totalOrders: 50 })
    expect(screen.getByText(/Showing 20 of 50 matches/)).toBeInTheDocument()
  })

  it('renders spinner when orderHistoryReceived is false', () => {
    renderHistory({ orderHistoryReceived: false })
    expect(document.querySelector('.fa-spinner')).toBeInTheDocument()
  })
})

describe('History interactions', () => {
  it('handleChange: typing updates input value', () => {
    renderHistory()
    const input = screen.getByPlaceholderText('Search orders...')
    fireEvent.change(input, { target: { value: 'my query' } })
    expect(input.value).toBe('my query')
  })

  it('clear button is hidden when searchQuery is empty', () => {
    renderHistory()
    expect(document.querySelector('.searchclear')).not.toBeInTheDocument()
  })

  it('clear button appears when searchQuery is not empty', () => {
    renderHistory()
    const input = screen.getByPlaceholderText('Search orders...')
    fireEvent.change(input, { target: { value: 'something' } })
    expect(document.querySelector('.searchclear')).toBeInTheDocument()
  })

  it('handleSubmit dispatches SEARCH_ORDERS_REQUEST when query is not empty', () => {
    const dispatch = jest.fn()
    renderHistory({}, dispatch)
    const input = screen.getByPlaceholderText('Search orders...')
    fireEvent.change(input, { target: { value: 'seeaaarchiiing seek and destroy' } })
    fireEvent.submit(input.closest('form'))
    expect(dispatch).toHaveBeenCalledWith({
      type: SEARCH_ORDERS_REQUEST,
      searchQuery: 'seeaaarchiiing seek and destroy',
    })
  })

  it('handleSubmit dispatches HISTORY_REQUEST when query is empty', () => {
    const dispatch = jest.fn()
    renderHistory({}, dispatch)
    const input = screen.getByPlaceholderText('Search orders...')
    fireEvent.submit(input.closest('form'))
    expect(dispatch).toHaveBeenCalledWith({ type: HISTORY_REQUEST })
  })

  it('handleClear clears input and dispatches HISTORY_REQUEST', () => {
    const dispatch = jest.fn()
    renderHistory({}, dispatch)
    const input = screen.getByPlaceholderText('Search orders...')
    fireEvent.change(input, { target: { value: 'something' } })
    fireEvent.click(document.querySelector('.searchclear'))
    expect(input.value).toBe('')
    expect(dispatch).toHaveBeenCalledWith({ type: HISTORY_REQUEST })
  })

  it('onBottom: scroll event triggers loading more orders', () => {
    const orders = Array.from({ length: 25 }, (_, i) => makeOrder(3000 + i))
    renderHistory({ orderHistory: orders, totalOrders: 25 })
    expect(screen.getAllByRole('link')).toHaveLength(20)

    // Simulate being scrolled to the bottom
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true })
    document.documentElement.scrollTop = 110 // scrollHeight - 200 (800) <= scrollTop + innerHeight (1010)

    fireEvent.scroll(document)

    expect(screen.getAllByRole('link')).toHaveLength(25)
  })
})
