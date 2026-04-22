import React from 'react'
import { render } from '@testing-library/react'
import { OrderDropDown } from './OrderDropDown'

describe('(Component) EnvironmentsDropDown', () => {
  const alternatives = [{ label: 'a', value: 'a' }]
  it('Renders without exploding', () => {
    const { container } = render(<OrderDropDown alternatives={alternatives} />)
    expect(container).toBeTruthy()
  })
})
