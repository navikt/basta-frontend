import React from 'react'
import { shallow } from 'enzyme'
import { HistoryCounter } from './HistoryCounter'

describe('(Component) HistoryCounter', () => {
  const wrapper = shallow(<HistoryCounter />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
