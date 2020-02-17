import { HISTORY_REQUEST, HISTORY_APPLY_FILTER } from '../actionTypes'

export const getOrderHistory = (pageSize, maxOrders) => {
  return { type: HISTORY_REQUEST, pageSize, maxOrders }
}

export const applyOrderHistoryFilter = (filter, nMaxResults) => {
  return { type: HISTORY_APPLY_FILTER, filter, nMaxResults }
}
