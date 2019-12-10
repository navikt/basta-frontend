import React from 'react'
import { shallow } from 'enzyme'
import { OrderCard } from './OrderCard'

describe('(Component) OrderCard', () => {
  const wrapper = shallow(<OrderCard enabled={true} url={'xx'} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
  it('Returns a disabled component when no matching access', () => {
    const wrapper2 = shallow(<OrderCard enabled={false} />)
    expect(wrapper2.find('div.disabled').length).toBe(1)
  })
})
