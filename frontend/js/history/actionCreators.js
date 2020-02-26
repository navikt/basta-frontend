import { HISTORY_REQUEST, SEARCH_ORDERS_REQUEST } from '../actionTypes'

export const getOrderHistory = maxOrders => {
  return { type: HISTORY_REQUEST, maxOrders }
}

export const searchOrders = searchQuery => {
  return { type: SEARCH_ORDERS_REQUEST, searchQuery }
}
