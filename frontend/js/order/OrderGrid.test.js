import React from 'react'
import { render } from '@testing-library/react'
import { OrderGrid } from './OrderGrid'

describe('(Component) OrderGrid', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderGrid />)
    expect(container).toBeTruthy()
  })
})
