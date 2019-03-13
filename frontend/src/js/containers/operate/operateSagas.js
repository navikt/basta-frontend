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
  OPERATION_SUBMIT_FAILED,
  CREDENTIAL_LOOKUP_REQUEST,
  CREDENTIAL_LOOKUP_SUBMITTING,
  CREDENTIAL_LOOKUP_SUCCESSFUL,
  CREDENTIAL_LOOKUP_FAILED
} from './operateActionTypes'
import { LATEST_ORDER_REQUEST } from '../history/actionTypes'

const createVmQuery = hostnames => {
  let queryString = ''
  hostnames.forEach(e => {
    queryString += `hostname=${e}&`
  })
  return queryString
}

export function* fetchVmInfo(action) {
  const lastQuery = yield select(getLastQuery)
  const newQuery = `/rest/v1/servers?${createVmQuery(action.hostnames)}`
  if (newQuery === lastQuery) {
    yield put({ type: VMLOOKUP_DUPLICATE_REQUEST_CANCELLED })
  } else {
    try {
      yield put({ type: VMLOOKUP_FETCHING })
      const vmInfo = yield call(getUrl, newQuery)
      yield put({
        type: VMLOOKUP_RECEIVED,
        value: vmInfo,
        query: `/rest/v1/servers?${createVmQuery(action.hostnames)}`
      })
    } catch (err) {
      yield put({ type: VMLOOKUP_REQUEST_FAILED, err })
    }
  }
}

export function* credentialLookup(action) {
  let credentialInfo = {}
  yield put({ type: CREDENTIAL_LOOKUP_SUBMITTING })
  try {
    credentialInfo.existInAD = yield call(
      getUrl,
      `/rest/orders/serviceuser/credential/existInAD?application=${
        action.form.applicationMappingName
      }&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    credentialInfo.existInFasit = yield call(
      getUrl,
      `/rest/orders/serviceuser/credential/existInFasit?application=${
        action.form.applicationMappingName
      }&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    credentialInfo.user = yield call(
      getUrl,
      `/rest/operation/serviceuser/credential/user?application=${
        action.form.applicationMappingName
      }&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    yield put({ type: CREDENTIAL_LOOKUP_SUCCESSFUL, credentialInfo })
  } catch (err) {
    yield put({ type: CREDENTIAL_LOOKUP_FAILED, err })
  }
}

export function* submitOperation(action) {
  let value
  let redirectUrl
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
        yield put({ type: OPERATION_SUBMIT_SUCCESSFUL, value })
        yield put({ type: LATEST_ORDER_REQUEST })
        redirectUrl = value.orderId ? `/orders/${value.orderId}` : '/'
        yield history.push(redirectUrl)
        break
      case 'credentials':
        switch (action.operation) {
          case 'start':
            value = yield call(
              postForm,
              `/rest/operation/serviceuser/credential/start`,
              action.form
            )
            break
          case 'stop':
            value = yield call(postForm, `/rest/operation/serviceuser/credential/stop`, action.form)
            break
          case 'delete':
            value = yield call(
              postForm,
              `/rest/operation/serviceuser/credential/delete`,
              action.form
            )
            break
        }
        yield put({ type: OPERATION_SUBMIT_SUCCESSFUL, value })
        yield put({ type: LATEST_ORDER_REQUEST })
        redirectUrl = value.id ? `/orders/${value.id}` : '/'
        break
    }
  } catch (error) {
    yield put({ type: OPERATION_SUBMIT_FAILED, error })
  }
}

export function* watchOperations() {
  yield fork(takeLatest, VMLOOKUP_REQUEST, fetchVmInfo)
  yield fork(takeEvery, SUBMIT_OPERATION, submitOperation)
  yield fork(takeLatest, CREDENTIAL_LOOKUP_REQUEST, credentialLookup)
}
