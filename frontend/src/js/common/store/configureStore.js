import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// const finalCreateStore = composeWithDevTools(
//   // bytt til redux/compose for å fjerne devtools
//   applyMiddleware(...middlewares)
// )(createStore)

const finalCreateStore = compose(
  // bytt til redux/compose for å fjerne devtools
  applyMiddleware(...middlewares)
)(createStore)

export function configureStore() {
  const store = finalCreateStore(rootReducer)
  sagaMiddleware.run(rootSaga)
  return store
}
