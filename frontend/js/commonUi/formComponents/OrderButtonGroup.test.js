import React from 'react'
import { render } from '@testing-library/react'
import { OrderButtonGroup } from './OrderButtonGroup'

describe('(Component) OrderButtonGroup', () => {
  const alternatives = [
    { access: ['1'], label: 'label', value: 'value' },
    { access: ['2'], label: 'label', value: 'value' },
  ]
  const roles = ['1']

  it('Renders without exploding', () => {
    const { container } = render(<OrderButtonGroup alternatives={alternatives} roles={roles} />)
    expect(container).toBeTruthy()
  })
  it('Renders a button for each button alternative', () => {
    const { container } = render(<OrderButtonGroup alternatives={alternatives} roles={roles} />)
    expect(container.querySelector('div.formComponentButtonGroup').children.length).toBe(2)
  })
  it('Gives us a disabled button if no roles match access requirements', () => {
    const { container } = render(<OrderButtonGroup alternatives={alternatives} roles={roles} />)
    expect(container.querySelectorAll('button.disabled').length).toBe(1)
  })
})
