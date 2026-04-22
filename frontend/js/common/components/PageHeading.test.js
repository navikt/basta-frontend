import React from 'react'
import { render } from '@testing-library/react'
import { PageHeading } from './PageHeading'

describe('(Component) PageHeading', () => {
  it('Renders without exploding', () => {
    const { container } = render(<PageHeading />)
    expect(container).toBeTruthy()
  })
})
