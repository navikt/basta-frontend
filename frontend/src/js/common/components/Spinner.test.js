import React from 'react'
import { shallow } from 'enzyme'
import Spinner from './Spinner'

const props = {
  order: {
    prototype: ''
  }
}

describe('(Component) Spinner', () => {
  const wrapper = shallow(<Spinner />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
