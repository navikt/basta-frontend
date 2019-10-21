import React from 'react'
import { shallow } from 'enzyme'
import { OrderButtonGroup } from './OrderButtonGroup'

describe('(Component) OrderButtonGroup', () => {
  const alternatives = [
    { access: ['1'], label: 'label', value: 'value' },
    { access: ['2'], label: 'label', value: 'value' }
  ]
  const roles = ['1']
  const wrapper = shallow(<OrderButtonGroup alternatives={alternatives} roles={roles} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  it('Renders a button for each button alternative', () => {
    expect(wrapper.find('div.formComponentButtonGroup').children().length).toBe(2)
  })
  it('Gives us a disabled button if no roles match access requirements', () => {
    expect(wrapper.find('button.disabled').length).toBe(1)
  })
})
