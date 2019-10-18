import React from 'react'
import { shallow } from 'enzyme'
import { NavMenuSmall } from './NavMenuSmall'

describe('(Component) NavMenuSmall', () => {
  const wrapper = shallow(<NavMenuSmall navMenu={{ visible: true }} />)
  it('Renders without exploding when visible', () => {
    expect(wrapper.length).toBe(1)
  })
  const wrapper2 = shallow(<NavMenuSmall navMenu={{ visible: false }} />)
  it('Does not render when not visible', () => {
    expect(wrapper2.type()).toBeNull()
  })
})
