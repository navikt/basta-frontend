import React from 'react'
import { shallow } from 'enzyme'
import { OrderDropDown } from './OrderDropDown'

describe('(Component) EnvironmentsDropDown', () => {
  const alternatives = [{ label: 'a', value: 'a' }]
  const wrapper = shallow(<OrderDropDown alternatives={alternatives} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
