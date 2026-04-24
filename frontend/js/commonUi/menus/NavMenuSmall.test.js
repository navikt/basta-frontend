import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { NavMenuSmall } from './NavMenuSmall'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('(Component) NavMenuSmall', () => {
  it('Renders without exploding when visible', () => {
    const { container } = renderWithRouter(<NavMenuSmall navMenu={{ visible: true }} />)
    expect(container.firstChild).toBeTruthy()
  })
  it('Does not render when not visible', () => {
    const { container } = renderWithRouter(<NavMenuSmall navMenu={{ visible: false }} />)
    expect(container.firstChild).toBeNull()
  })
})
