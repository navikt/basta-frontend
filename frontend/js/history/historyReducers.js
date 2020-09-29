import {
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_REQUEST_FAILED,
  SEARCH_FETCHING,
  SEARCH_RESULTS_RECEIVED,
  SEARCH_FAILED
} from '../actionTypes'

export default (
  state = {
    orderHistory: [],
    orderHistoryReceived: false,
    totalOrders: 0,
    requestFailed: false,
    searchProcessing: false,
    filterApplied: false,
    errorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case HISTORY_FETCHING:
      return {
        ...state,
        orderHistoryReceived: false,
        requestFailed: false
      }
    case HISTORY_RECEIVED:
      return {
        ...state,
        orderHistory: action.orders,
        totalOrders: action.orders.length,
        filterApplied: false,
        requestFailed: false,
        orderHistoryReceived: true
      }
    case HISTORY_REQUEST_FAILED:
      return {
        ...state,
        orderHistory: [],
        totalOrders: 0,
        requestFailed: true,
        orderHistoryReceived: false,
        errorMessage: action.err
      }
    case SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        filterApplied: true,
        searchProcessing: false,
        orderHistory: action.searchResults,
        totalOrders: action.searchResults.length
      }
    case SEARCH_FETCHING:
      return {
        ...state,
        searchProcessing: true,
        filterApplied: false
      }
    case SEARCH_FAILED:
      return {
        ...state,
        filterApplied: false,
        searchProcessing: false,
        requestFailed: true,
        errorMassage: action.err
      }
    default:
      return state
  }
}
