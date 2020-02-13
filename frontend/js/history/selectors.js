export const getOrders = (state, n) => {
  return state.orderHistory.orderHistory
}

export const getTotalOrders = state => state.orderHistory.totalOrders

export const getPageId = state => state.orderHistory.pageId

export const getToDate = state => state.orderHistory.toDate

export const getFromDate = state => state.orderHistory.fromDate

export const getPageSize = state => state.orderHistory.pageSize
