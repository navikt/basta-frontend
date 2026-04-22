import React from 'react'
import { render } from '@testing-library/react'
import { OrderTextBox } from './OrderTextBox'

describe('(Component) OrderTextBox', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderTextBox />)
    expect(container).toBeTruthy()
  })
})
