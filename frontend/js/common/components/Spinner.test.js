import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('(Component) Spinner', () => {
  it('Renders without exploding', () => {
    const { container } = render(<Spinner />)
    expect(container).toBeTruthy()
  })
})
