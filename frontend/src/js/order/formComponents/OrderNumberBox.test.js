import React from 'react'
import { shallow } from 'enzyme'
import { OrderNumberBox } from './OrderNumberBox'

describe('(Component) OrderNumberBox', () => {
  const wrapper = shallow(<OrderNumberBox valid={true} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  const wrapper2 = shallow(<OrderNumberBox valid={false} />)
  it('displays an error message when numbers are out of bounds', () => {
    expect(wrapper2.find('div.formComponentError').length).toBe(1)
  })
})
