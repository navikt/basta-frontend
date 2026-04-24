import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavMenu } from './NavMenu'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

const unpriviligedUser = {
  userProfile: {
    roles: ['ROLE_USER'],
  },
}

const priviligedUser = {
  userProfile: {
    roles: ['ROLE_SUPERUSER'],
  },
}

describe('(Component) NavMenu', () => {
  it('Renders without exploding', () => {
    const { container } = renderWithRouter(<NavMenu dispatch={() => {}} user={unpriviligedUser} />)
    expect(container).toBeTruthy()
    expect(container.querySelector('ul').children.length).toBe(3)
  })
})

describe('(Component) NavMenu with notifications access', () => {
  it('Superusers see the notifications menu item', () => {
    const { container } = renderWithRouter(<NavMenu dispatch={() => {}} user={priviligedUser} />)
    expect(container.querySelector('ul').children.length).toBe(4)
  })
})
