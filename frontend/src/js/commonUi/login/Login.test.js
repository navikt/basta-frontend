import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

const props = {
  location: {
    pathname: 'jesusRodriguez'
  }
}

describe('(Component) Spinner', () => {
  const wrapper = shallow(<Login {...props} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
