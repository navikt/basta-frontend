import React from 'react'
import { shallow } from 'enzyme'
import { HistoryFilter } from './HistoryFilter'

describe('(Component) HistoryFilter', () => {
  const wrapper = shallow(<HistoryFilter />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
