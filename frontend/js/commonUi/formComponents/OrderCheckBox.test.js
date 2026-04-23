import React from 'react'
import { render } from '@testing-library/react'
import { OrderCheckBox } from './OrderCheckBox'

describe('(Component) OrderCheckBox', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderCheckBox />)
    expect(container).toBeTruthy()
  })
})
