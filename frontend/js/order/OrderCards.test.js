import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OrderCard } from './OrderCard'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('(Component) OrderCard', () => {
  it('Renders without exploding', () => {
    const { container } = renderWithRouter(<OrderCard enabled={true} url={'xx'} />)
    expect(container.firstChild).toBeTruthy()
  })
  it('Returns a disabled component when no matching access', () => {
    const { container } = renderWithRouter(<OrderCard enabled={false} />)
    expect(container.querySelectorAll('div.disabled').length).toBe(1)
  })
})
