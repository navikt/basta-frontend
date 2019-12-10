import React from 'react'
import { shallow } from 'enzyme'
import { PageHeading } from './PageHeading'

describe('(Component) PageHeading', () => {
  const wrapper = shallow(<PageHeading />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
