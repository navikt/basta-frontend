import React from 'react'
import { shallow } from 'enzyme'
import { OrderDbTemplateDropDown } from './OrderDbTemplateDropDown'

describe('(Component) OrderDbTemplateDropDown', () => {
  const wrapper = shallow(<OrderDbTemplateDropDown dbTemplates={[]} dispatch={() => {}} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  const dbTemplates = [
    { description: 'c' },
    { description: 'DEPRECATED' },
    { description: 'd' },
    { description: 'b' },
    { description: 'a' }
  ]

  const wrapper2 = shallow(
    <OrderDbTemplateDropDown dbTemplates={dbTemplates} dispatch={() => {}} />
  )
  it('orders templates by description correctly. Deprecated at bottom', () => {
    const selectOptions = wrapper2.find('StateManager').props().options
    expect(selectOptions[0].label).toBe('a')
    expect(selectOptions[1].label).toBe('b')
    expect(selectOptions[2].label).toBe('c')
    expect(selectOptions[3].label).toBe('d')
    expect(selectOptions[4].label).toBe('DEPRECATED')
  })
})

const dbTemplateWithObj = [
  {
    uri: 'templateuri/id',
    description: 'blah',
    name: 'template_name',
    zoneuri: 'zone/uri'
  }
]

const wrapper3 = shallow(
  <OrderDbTemplateDropDown dbTemplates={dbTemplateWithObj} dispatch={() => {}} />
)
it('maps db template object correctly', () => {
  const selectBoxOption = wrapper3.find('StateManager').props().options[0]
  const optionLabel = selectBoxOption.label
  const optionValue = selectBoxOption.value

  expect(optionLabel).toBe('blah')
  expect(optionValue.uri).toBe('templateuri/id')
  expect(optionValue.name).toBe('template_name')
  expect(optionValue.zoneuri).toBe('zone/uri')
})
