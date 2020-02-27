import { put, fork, call, takeLatest } from 'redux-saga/effects'
import { getUrl } from '../common/utils'
import {
  HISTORY_REQUEST,
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_REQUEST_FAILED,
  SEARCH_ORDERS_REQUEST,
  SEARCH_FETCHING,
  SEARCH_FAILED,
  SEARCH_RESULTS_RECEIVED
} from '../actionTypes'

const ORDERS_TO_FETCH = 50

export function* getOrderHistory() {
  yield put({
    type: HISTORY_FETCHING
  })
  try {
    let orders = yield call(getUrl, `/rest/orders/page/0/${ORDERS_TO_FETCH}`)
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

export function* watcHistory() {
  yield fork(takeLatest, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeLatest, SEARCH_ORDERS_REQUEST, searchOrders)
}
