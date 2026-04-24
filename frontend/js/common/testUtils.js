import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

export const renderWithProviders = (ui, { state = {}, route = '/' } = {}) => {
  const store = mockStore(state)
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  )
}
