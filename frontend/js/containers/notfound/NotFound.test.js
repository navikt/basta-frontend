import React from 'react'
import { shallow } from 'enzyme'
import { NotFound } from './NotFound'

describe('(Component) NotFound', () => {
  const wrapper = shallow(<NotFound />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
