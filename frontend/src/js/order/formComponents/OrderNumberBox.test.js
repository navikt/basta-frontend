import React from 'react'
import { shallow } from 'enzyme'
import { OrderNumberBox } from './OrderNumberBox'

describe('(Component) OrderNumberBox', () => {
  const wrapper = shallow(<OrderNumberBox min={1} max={3} value={2} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  const wrapper2 = shallow(<OrderNumberBox min={1} max={2} value={4} />)
  it('displays an error message when numbers are out of bounds', () => {
    expect(wrapper2.find('div.formComponentError').length).toBe(1)
  })
})
