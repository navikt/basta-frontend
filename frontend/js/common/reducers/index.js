import { combineReducers } from 'redux'
import user from './user'
import initialize from './initialize'
import navMenu from '../../commonUi/menus/reducer'
import orderHistory from '../../history/historyReducers'
import order from '../../containers/order/reducers'
import orderFormData from './orderFormData'
import operationsForm from '../../operations/operateReducers'
import notificationsForm from '../../notifications/notificationsReducer'

const rootReducer = combineReducers({
  navMenu,
  user,
  initialize,
  history,
  order,
  orderFormData,
  orderHistory,
  operationsForm,
  notificationsForm,
})

export default rootReducer
