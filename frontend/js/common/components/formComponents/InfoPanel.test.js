import React from 'react'
import { render } from '@testing-library/react'
import InfoPanel from './InfoPanel'

describe('(Component) InfoPanel', () => {
  it('renders without exploding', () => {
    const { container } = render(<InfoPanel />)
    expect(container).toBeTruthy()
  })

  it('renders message div if show', () => {
    const { container: c1 } = render(<InfoPanel />)
    expect(c1.querySelectorAll('.info-message').length).toBe(0)
    const { container: c2 } = render(<InfoPanel show={true} />)
    expect(c2.querySelectorAll('.info-message').length).toBe(1)
  })
})
