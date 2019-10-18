import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import initialize from './initialize'
import navMenu from '../../commonUi/menus/reducer'
import orderHistory from '../../containers/history/reducers'
import order from '../../containers/order/reducers'
import orderFormData from './orderFormData'
import operationsForm from '../../containers/operate/operateReducers'

const rootReducer = combineReducers({
  routing: routerReducer,
  navMenu,
  user,
  initialize,
  history,
  order,
  orderFormData,
  orderHistory,
  operationsForm
})

export default rootReducer
