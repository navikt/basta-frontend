import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import initialize from './initialize'
import navMenu from '../../containers/navMenu/reducer'
import orderHistory from '../../containers/history/reducers'
import order from '../../containers/order/reducers'

const rootReducer = combineReducers({
  routing: routerReducer,
  navMenu,
  user,
  initialize,
  orderHistory,
  order
})

export default rootReducer
