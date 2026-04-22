import React from 'react'
import { render } from '@testing-library/react'
import { OrderNumberBox } from './OrderNumberBox'

describe('(Component) OrderNumberBox', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderNumberBox min={1} max={3} value={2} />)
    expect(container).toBeTruthy()
  })
  it('displays an error message when numbers are out of bounds', () => {
    const { container } = render(<OrderNumberBox min={1} max={2} value={4} />)
    expect(container.querySelectorAll('div.formComponentError').length).toBe(1)
  })
})
