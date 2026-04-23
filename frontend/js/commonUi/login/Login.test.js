import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

const props = {
  location: {
    pathname: 'jesusRodriguez',
  },
}

describe('(Component) Login', () => {
  it('Renders without exploding', () => {
    const { container } = render(<Login {...props} />)
    expect(container).toBeTruthy()
  })
})
