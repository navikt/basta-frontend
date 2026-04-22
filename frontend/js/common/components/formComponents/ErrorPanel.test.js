import React from 'react'
import { render } from '@testing-library/react'
import ErrorPanel from './ErrorPanel'

describe('(Component) ErrorPanel', () => {
  it('renders without exploding', () => {
    const { container } = render(<ErrorPanel />)
    expect(container).toBeTruthy()
  })

  it('renders message div if show', () => {
    const { container: c1 } = render(<ErrorPanel />)
    expect(c1.querySelectorAll('.error-message').length).toBe(0)
    const { container: c2 } = render(<ErrorPanel show={true} />)
    expect(c2.querySelectorAll('.error-message').length).toBe(1)
  })
})
