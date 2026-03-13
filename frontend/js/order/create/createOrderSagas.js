import history from '../../common/history'
import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, postForm } from '../../common/utils'
import {
  SUBMIT_FORM,
  FORM_SUBMITTING,
  FORM_SUBMIT_SUCCESSFUL,
  FORM_SUBMIT_FAILED,
  STATUSLOG_REQUEST,
  STATUSLOG_FETCHING,
  STATUSLOG_RECEIVED,
  STATUSLOG_REQUEST_FAILED,
  ORDER_REQUEST,
  ORDER_FETCHING,
  ORDER_RECEIVED,
  ORDER_REQUEST_FAILED,
  HISTORY_REQUEST
} from '../../actionTypes'

export function* submitServerOrderForm(action) {}

export function* submitForm(action) {
  let value = ''
  yield put({ type: FORM_SUBMITTING })

  const apiPath = action.apiPath

  try {
    value = yield call(postForm, apiPath, action.orders)
    yield put({ type: FORM_SUBMIT_SUCCESSFUL, value })

    const orderId = value.id ? value.id : value

    yield history.push(`/orders/${orderId}`)
    yield put({ type: HISTORY_REQUEST })
  } catch (error) {
    yield put({ type: FORM_SUBMIT_FAILED, error })
  }
}

export function* getStatusLog(action) {
  try {
    yield put({ type: STATUSLOG_FETCHING })
    const value = yield call(getUrl, `/rest/orders/${action.orderId}/statuslog`)
    yield put({ type: STATUSLOG_RECEIVED, value })
  } catch (error) {
    yield put({ type: STATUSLOG_REQUEST_FAILED, error })
  }
}

export function* getOrderDetails(action) {
  try {
    yield put({ type: ORDER_FETCHING })
    const value = yield call(getUrl, `/rest/orders/${action.orderId}`)
    yield put({ type: ORDER_RECEIVED, value })
  } catch (error) {
    yield put({ type: ORDER_REQUEST_FAILED, error })
  }
}

export function* watchOrder() {
  yield fork(takeEvery, SUBMIT_FORM, submitForm)
  yield fork(takeEvery, ORDER_REQUEST, getOrderDetails)
  yield fork(takeEvery, STATUSLOG_REQUEST, getStatusLog)
}
