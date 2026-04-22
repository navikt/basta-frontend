import React from 'react'
import { render } from '@testing-library/react'
import { NotFound } from './NotFound'

describe('(Component) NotFound', () => {
  it('Renders without exploding', () => {
    const { container } = render(<NotFound />)
    expect(container).toBeTruthy()
  })
})
