import React from 'react'
import { shallow } from 'enzyme'
import { OrderGrid } from './OrderGrid'

describe('(Component) OrderGrid', () => {
  const wrapper = shallow(<OrderGrid />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
