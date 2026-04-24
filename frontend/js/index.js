import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import store from './common/store'
import history from './common/history'
import App from './App'

const HistoryRouter = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })
  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router navigator={history} location={state.location} navigationType={state.action}>
      {children}
    </Router>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>,
)
