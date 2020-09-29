import { createStore, applyMiddleware } from 'redux'
// import { compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// switch to compose to disable devtools
const finalCreateStore = composeWithDevTools(applyMiddleware(...middlewares))(createStore)

// const finalCreateStore = compose(
//   applyMiddleware(...middlewares)
// )(createStore)

export function configureStore() {
  const store = finalCreateStore(rootReducer)
  sagaMiddleware.run(rootSaga)
  return store
}
