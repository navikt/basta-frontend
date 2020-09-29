import { HISTORY_REQUEST, SEARCH_ORDERS_REQUEST } from '../actionTypes'

export const getOrderHistory = () => {
  return { type: HISTORY_REQUEST }
}

export const searchOrders = searchQuery => {
  return { type: SEARCH_ORDERS_REQUEST, searchQuery }
}
