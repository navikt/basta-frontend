import React from 'react'
import { render } from '@testing-library/react'
import { OrderDbTemplateDropDown, mapToOptions } from './OrderDbTemplateDropDown'

describe('(Component) OrderDbTemplateDropDown', () => {
  it('Renders without exploding', () => {
    const { container } = render(<OrderDbTemplateDropDown dbTemplates={[]} dispatch={() => {}} />)
    expect(container).toBeTruthy()
  })
})

describe('OrderDbTemplateDropDown / mapToOptions', () => {
  it('orders templates by description, with DEPRECATED at the bottom', () => {
    const dbTemplates = [
      { description: 'c' },
      { description: 'DEPRECATED' },
      { description: 'd' },
      { description: 'b' },
      { description: 'a' },
    ]
    const options = mapToOptions(dbTemplates)
    expect(options.map((o) => o.label)).toEqual(['a', 'b', 'c', 'd', 'DEPRECATED'])
  })

  it('treats any description containing "deprecated" (case insensitive) as bottom', () => {
    const dbTemplates = [
      { description: 'foo' },
      { description: 'My Template (deprecated)' },
      { description: 'bar' },
    ]
    expect(mapToOptions(dbTemplates).map((o) => o.label)).toEqual([
      'bar',
      'foo',
      'My Template (deprecated)',
    ])
  })

  it('maps a db template object to { label: description, value: <whole template> }', () => {
    const tpl = {
      uri: 'templateuri/id',
      description: 'blah',
      name: 'template_name',
      zoneuri: 'zone/uri',
    }
    const [option] = mapToOptions([tpl])
    expect(option.label).toBe('blah')
    expect(option.value).toEqual(tpl)
    expect(option.value.uri).toBe('templateuri/id')
    expect(option.value.name).toBe('template_name')
    expect(option.value.zoneuri).toBe('zone/uri')
  })

  it('returns an empty array when there are no templates', () => {
    expect(mapToOptions([])).toEqual([])
  })
})
