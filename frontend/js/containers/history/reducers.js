import {
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED,
  HISTORY_APPLY_FILTER_COMPLETE,
  LATEST_ORDER_FETCHING,
  LATEST_ORDER_RECEIVED,
  LATEST_ORDER_REQUEST_FAILED
} from '../../actionTypes'

export default (
  state = {
    orderHistory: [],
    filteredOrderHistory: [],
    fromDate: 0,
    toDate: 0,
    totalOrders: 0,
    maxOrders: 0,
    pageId: 0,
    pageSize: 1000,
    orderHistoryCompleted: false,
    requestFailed: false,
    requestStatus: ''
  },
  action
) => {
  switch (action.type) {
    // HISTORY

    case HISTORY_FETCHING:
      return {
        ...state,
        maxOrders: action.maxOrders,
        toDate: action.toDate,
        fromDate: action.fromDate,
        pageSize: action.pageSize,
        orderHistoryCompleted: false,
        requestFailed: false,
        requestStatus: 'Fetching history log'
      }
    case HISTORY_RECEIVED:
      return {
        ...state,
        orderHistory: state.orderHistory.concat(action.value),
        totalOrders: state.orderHistory.length,
        pageId: action.pageId,
        requestFailed: false,
        requestStatus: 'Order history partially complete'
      }
    case HISTORY_COMPLETE:
      return {
        ...state,
        orderHistoryCompleted: true,
        totalOrders: state.orderHistory.length,
        requestFailed: false,
        requestStatus: 'Order history request complete'
      }
    case HISTORY_REQUEST_FAILED:
      return {
        ...state,
        orderHistoryCompleted: false,
        totalOrders: 0,
        requestFailed: true,
        requestStatus: action.err
      }
    case HISTORY_APPLY_FILTER_COMPLETE:
      return {
        ...state,
        filteredOrderHistory: action.orders
      }
    case LATEST_ORDER_FETCHING:
      return {
        ...state,
        requestFailed: false,
        requestStatus: 'Fetching latest order'
      }
    case LATEST_ORDER_RECEIVED:
      return {
        ...state,
        orderHistory: state.filteredOrderHistory.unshift(action.value[0]),
        requestFailed: false,
        requestStatus: 'Fetching latest order complete'
      }
    case LATEST_ORDER_REQUEST_FAILED:
      return {
        ...state,
        requestFailed: true,
        requestStatus: action.err
      }
    default:
      return state
  }
}
