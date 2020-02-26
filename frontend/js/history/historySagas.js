import { takeEvery, put, fork, call, takeLatest } from 'redux-saga/effects'
import { getUrl } from '../common/utils'
import {
  HISTORY_REQUEST,
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_REQUEST_FAILED,
  LATEST_ORDER_REQUEST,
  LATEST_ORDER_RECEIVED,
  LATEST_ORDER_FETCHING,
  LATEST_ORDER_REQUEST_FAILED,
  SEARCH_ORDERS_REQUEST,
  SEARCH_FETCHING,
  SEARCH_FAILED,
  SEARCH_RESULTS_RECEIVED
} from '../actionTypes'

export function* getOrderHistory(action) {
  const ordersPrPage = action.maxOrders
  yield put({
    type: HISTORY_FETCHING
  })
  try {
    let orders = yield call(getUrl, `/rest/orders/page/0/${ordersPrPage}`)
    yield put({ type: HISTORY_RECEIVED, orders })
  } catch (err) {
    yield put({ type: HISTORY_REQUEST_FAILED, err })
  }
}

export function* searchOrders(action) {
  yield put({ type: SEARCH_FETCHING })
  try {
    let searchResults = yield call(getUrl, `/rest/search?q=${action.searchQuery}`)
    yield put({ type: SEARCH_RESULTS_RECEIVED, searchResults })
  } catch (err) {
    yield put({ type: SEARCH_FAILED, err })
  }
}

export function* getLatestOrder() {
  yield put({ type: LATEST_ORDER_FETCHING })
  try {
    let order = yield call(getUrl, `/rest/orders/page/0/1`)
    yield put({
      type: LATEST_ORDER_RECEIVED,
      value: order
    })
  } catch (err) {
    yield put({ type: LATEST_ORDER_REQUEST_FAILED, err })
  }
}

export function* watcHistory() {
  yield fork(takeLatest, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeLatest, SEARCH_ORDERS_REQUEST, searchOrders)
  yield fork(takeEvery, LATEST_ORDER_REQUEST, getLatestOrder)
}
