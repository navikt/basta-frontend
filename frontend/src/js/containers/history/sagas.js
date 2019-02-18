import { takeEvery, put, fork, call, select, take, takeLatest } from 'redux-saga/effects'
import {
  getOrders,
  getTotalOrders,
  getPageId,
  getToDate,
  getFromDate,
  getPageSize
} from './selectors'
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
  if (value.length > 0 && !(totalOrders >= action.maxOrders - action.pageSize)) {
    pageId++
    yield put({ type: HISTORY_RECEIVED, value, pageId: pageId })
    yield call(delay, 200)
    yield getPartialHistory(action, pageId)
  } else {
    yield put({ type: HISTORY_COMPLETE })
  }
}

export function* getOrderHistory(action) {
  let pageId = yield select(getPageId)
  if (!pageId) pageId = 0
  if (!action.pageSize) action.pageSize = yield select(getPageSize)
  if (!action.toDate) action.toDate = yield select(getToDate)
  if (!action.fromDate) action.fromDate = yield select(getFromDate)
  yield put({
    type: HISTORY_FETCHING,
    maxOrders: action.maxOrders,
    toDate: action.toDate,
    fromDate: action.fromDate,
    pageSize: action.pageSize
  })
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
  yield fork(takeLatest, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeLatest, HISTORY_APPLY_FILTER, applyOrderHistoryFilter)
}
