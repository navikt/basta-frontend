import React from 'react'
import { shallow } from 'enzyme'
import { BottomScrollListener } from './BottomScrollListener'

describe('(Component) HistoryFilter', () => {
  const wrapper = shallow(<BottomScrollListener />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
