import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavMenuSmall } from './NavMenuSmall'

const renderWithRouter = (ui) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </MemoryRouter>,
  )

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
