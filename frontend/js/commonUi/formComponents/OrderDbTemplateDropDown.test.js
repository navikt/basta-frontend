import React from 'react'
import { render } from '@testing-library/react'
import { OrderDbTemplateDropDown } from './OrderDbTemplateDropDown'

describe('(Component) OrderDbTemplateDropDown', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderDbTemplateDropDown dbTemplates={[]} dispatch={() => {}} />)
    expect(container).toBeTruthy()
  })
})
