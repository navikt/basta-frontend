import { takeEvery, takeLatest, put, fork, call, select } from 'redux-saga/effects'
import history from '../../common/history'
import { getUrl, postForm } from '../utils'
import { getLastQuery } from './selectors'
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
} from '../actionTypes'

const createQuery = hostnames => {
  let queryString = ''
  hostnames.forEach(e => {
    queryString += `hostname=${e}&`
  })
  return queryString
}

export function* fetchVmInfo(action) {
  console.log('fetchVmInfo', action.hostnames)
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
  console.log('alt funker', action)
  let value
  yield put({ type: OPERATION_SUBMITTING, value: action })
  // yield history.push('/operate')
  try {
    switch (action.key) {
      case 'nodes':
        const hostnames = Array.from(action.form.hostnames.hostnames)
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
  } catch (error) {
    yield put({ type: OPERATION_SUBMIT_FAILED, error })
  }
}

export function* watchOperations() {
  yield fork(takeLatest, VMLOOKUP_REQUEST, fetchVmInfo)
  yield fork(takeEvery, SUBMIT_OPERATION, submitOperation)
}