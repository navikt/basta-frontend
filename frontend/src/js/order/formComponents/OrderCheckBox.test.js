import React from 'react'
import { shallow } from 'enzyme'
import { OrderCheckBox } from './OrderCheckBox'

describe('(Component) OrderCheckBox', () => {
  const wrapper = shallow(<OrderCheckBox />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
