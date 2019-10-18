import React from 'react'
import { shallow } from 'enzyme'
import { NavMenu } from './NavMenu'

describe('(Component) NavMenu', () => {
  const wrapper = shallow(<NavMenu dispatch={() => {}} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
