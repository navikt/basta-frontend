import React from 'react'
import { shallow } from 'enzyme'
import { OrderTextBox } from './OrderTextBox'

describe('(Component) OrderTextBox', () => {
  const wrapper = shallow(<OrderTextBox />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
