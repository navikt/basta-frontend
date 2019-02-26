import { takeEvery, takeLatest, put, fork, call, select } from 'redux-saga/effects'
import { getUrl, postForm } from '../../common/utils'
import history from '../../common/history'
import { getLastQuery } from './operateSelectors'
import {
  VMLOOKUP_REQUEST,
  VMLOOKUP_DUPLICATE_REQUEST_CANCELLED,
  VMLOOKUP_FETCHING,
  VMLOOKUP_REQUEST_FAILED,
  VMLOOKUP_RECEIVED,
  SUBMIT_OPERATION,
  OPERATION_SUBMITTING,
  OPERATION_SUBMIT_SUCCESSFUL,
  OPERATION_SUBMIT_FAILED
} from './operateActionTypes'
import { LATEST_ORDER_REQUEST } from '../history/actionTypes'

const createQuery = hostnames => {
  let queryString = ''
  hostnames.forEach(e => {
    queryString += `hostname=${e}&`
  })
  return queryString
}

export function* fetchVmInfo(action) {
  const lastQuery = yield select(getLastQuery)
  const newQuery = `/rest/v1/servers?${createQuery(action.hostnames)}`
  if (newQuery === lastQuery) {
    yield put({ type: VMLOOKUP_DUPLICATE_REQUEST_CANCELLED })
  } else {
    try {
      yield put({ type: VMLOOKUP_FETCHING })
      const vmInfo = yield call(getUrl, newQuery)

      yield put({
        type: VMLOOKUP_RECEIVED,
        value: vmInfo,
        query: `/rest/v1/servers?${createQuery(action.hostnames)}`
      })
    } catch (err) {
      yield put({ type: VMLOOKUP_REQUEST_FAILED, err })
    }
  }
}

export function* submitOperation(action) {
  let value
  yield put({ type: OPERATION_SUBMITTING, value: action })

  try {
    switch (action.key) {
      case 'nodes':
        const hostnames = Array.from(action.form)

        switch (action.operation) {
          case 'start':
            value = yield call(postForm, `/rest/vm/operations/start`, hostnames)
            break
          case 'stop':
            value = yield call(postForm, `/rest/vm/operations/stop`, hostnames)
            break
          case 'delete':
            value = yield call(postForm, `/rest/vm/operations/decommission`, hostnames)
            break
        }
    }
    yield put({ type: OPERATION_SUBMIT_SUCCESSFUL, value })
    yield put({ type: LATEST_ORDER_REQUEST })
    const redirectUrl = value.orderId ? `/orders/${value.orderId}` : '/'

    yield history.push(redirectUrl)
  } catch (error) {
    yield put({ type: OPERATION_SUBMIT_FAILED, error })
  }
}

export function* watchOperations() {
  yield fork(takeLatest, VMLOOKUP_REQUEST, fetchVmInfo)
  yield fork(takeEvery, SUBMIT_OPERATION, submitOperation)
}
