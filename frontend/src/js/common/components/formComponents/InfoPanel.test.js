import React from 'react'
import { shallow } from 'enzyme'
import InfoPanel from './InfoPanel'

describe('(Component) InfoPanel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<InfoPanel />)
  })

  it('(Component) InfoPanel renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  it('(Component) InfoPanel renders component if show', () => {
    expect(wrapper.find('.info-message')).toHaveLength(0)
    wrapper = shallow(<InfoPanel show={true} />)
    expect(wrapper.find('.info-message')).toHaveLength(1)
  })
})
