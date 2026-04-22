import React from 'react'
import { render } from '@testing-library/react'
import { BottomScrollListener } from './BottomScrollListener'

describe('(Component) BottomScrollListener', () => {
  it('Renders without exploding', () => {
    const { container } = render(<BottomScrollListener />)
    expect(container).toBeTruthy()
  })
})
