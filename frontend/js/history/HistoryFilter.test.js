import React from 'react'
import { render } from '@testing-library/react'
import { HistoryFilter } from './HistoryFilter'

describe('(Component) HistoryFilter', () => {
  it('Renders without exploding', () => {
    const { container } = render(<HistoryFilter />)
    expect(container).toBeTruthy()
  })
})
