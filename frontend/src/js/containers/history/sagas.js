import { takeEvery, put, fork, call, select, take, takeLatest } from 'redux-saga/effects'
import { getOrders, getTotalOrders } from './selectors'
import { filterOrders, formatOrders } from './filters'
import { getUrl } from '../../common/utils'
import {
  HISTORY_REQUEST,
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED,
  HISTORY_APPLY_FILTER,
  HISTORY_APPLY_FILTER_COMPLETE
} from './actionTypes'

const delay = millis => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  })
  return promise
}

export function* getPartialHistory(action, pageId) {
  let value = ''
  value = yield call(
    getUrl,
    `/rest/orders/page/${pageId}/${action.pageSize}/${action.fromDate}/${action.toDate}`
  )
  const totalOrders = yield select(getTotalOrders)
  console.log(totalOrders)
  console.log(value.length)
  if (value.length > 0 && !(totalOrders >= 4000)) {
    pageId++
    yield put({ type: HISTORY_RECEIVED, value })
    yield call(delay, 200)
    yield getPartialHistory(action, pageId)
  } else {
    yield put({ type: HISTORY_COMPLETE })
  }
}

export function* getOrderHistory(action) {
  let pageId = 0
  if (!action.toDate) action.toDate = 0
  if (!action.fromDate) action.fromDate = 0
  yield put({ type: HISTORY_FETCHING })
  try {
    yield getPartialHistory(action, pageId)
  } catch (err) {
    yield put({ type: HISTORY_REQUEST_FAILED, err })
  }
}

export function* applyOrderHistoryFilter(action) {
  let orders = yield select(getOrders)
  if (orders.length > 0) {
    orders = yield call(formatOrders, orders)
    orders = yield call(filterOrders, orders, action.filter)
    yield put({ type: HISTORY_APPLY_FILTER_COMPLETE, orders })
  } else {
    yield take(['HISTORY_RECEIVED'])
    orders = yield select(getOrders)
    orders = yield call(formatOrders, orders)
    orders = yield call(filterOrders, orders, action.filter)
    yield put({ type: HISTORY_APPLY_FILTER_COMPLETE, orders })
  }
}

export function* watcHistory() {
  yield fork(takeEvery, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeLatest, HISTORY_APPLY_FILTER, applyOrderHistoryFilter)
}
