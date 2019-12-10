import React from 'react'
import { shallow } from 'enzyme'
import { OrderFilter } from './OrderFilter'

describe('(Component) OrderFilter', () => {
  const wrapper = shallow(<OrderFilter />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
