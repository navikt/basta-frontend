import React from 'react'
import { shallow } from 'enzyme'
import ErrorPanel from './ErrorPanel'

describe('(Component) ErrorPanel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ErrorPanel />)
  })

  it('(Component) ErrorPanel renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  it('(Component) ErrorPanel renders component if show', () => {
    expect(wrapper.find('.error-message')).toHaveLength(0)
    wrapper = shallow(<ErrorPanel show={true} />)
    expect(wrapper.find('.error-message')).toHaveLength(1)
  })
})
