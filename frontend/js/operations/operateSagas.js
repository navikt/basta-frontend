import { takeEvery, takeLatest, put, fork, call, select } from 'redux-saga/effects'
import { getUrl, postForm, putForm } from '../common/utils'
import history from '../common/history'
import {
  SUBMIT_OPERATION,
  OPERATION_SUBMITTING,
  OPERATION_SUBMIT_SUCCESSFUL,
  OPERATION_SUBMIT_FAILED,
  CREDENTIAL_LOOKUP_REQUEST,
  CUSTOM_CREDENTIAL_LOOKUP_REQUEST,
  CREDENTIAL_LOOKUP_SUBMITTING,
  CREDENTIAL_LOOKUP_SUCCESSFUL,
  CREDENTIAL_LOOKUP_FAILED,
  HISTORY_REQUEST
} from '../actionTypes'

export function* credentialLookup(action) {
  let credentialInfo = {}
  yield put({ type: CREDENTIAL_LOOKUP_SUBMITTING })
  try {
    credentialInfo.existInAD = yield call(
      getUrl,
      `/rest/orders/serviceuser/credential/existInAD?application=${action.form.application}&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    credentialInfo.existInFasit = yield call(
      getUrl,
      `/rest/orders/serviceuser/credential/existInFasit?application=${action.form.application}&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    credentialInfo.user = yield call(
      getUrl,
      `/rest/operation/serviceuser/credential/user?application=${action.form.application}&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    yield put({ type: CREDENTIAL_LOOKUP_SUCCESSFUL, credentialInfo })
  } catch (error) {
    yield put({ type: CREDENTIAL_LOOKUP_FAILED, error })
  }
}

export function* customCredentialLookup(action) {
  let credentialInfo = {}
  yield put({ type: CREDENTIAL_LOOKUP_SUBMITTING })
  try {
    credentialInfo.existInAD = yield call(
      getUrl,
      `/rest/orders/serviceuser/customcredential/existInAD?username=${action.form.username}&environmentClass=${action.form.environmentClass}&zone=${action.form.zone}`
    )
    yield put({ type: CREDENTIAL_LOOKUP_SUCCESSFUL, credentialInfo })
  } catch (error) {
    yield put({ type: CREDENTIAL_LOOKUP_FAILED, error })
  }
}

function* submitNodeOperations(action) {
  const hostnames = Array.from(action.form)
  let value

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
  return value
}

function* submitDeleteCredentialOperation(action) {
  let value = yield call(postForm, `/rest/operation/serviceuser/credential/delete`, action.form)
  return value
}

function* submitDeleteQueueOperation(action) {
  let value = yield call(putForm, `/rest/v1/mq/order/queue/remove`, action.form)
  return value
}

export function* submitOperation(action) {
  let value

  yield put({ type: OPERATION_SUBMITTING, value: action })

  try {
    switch (action.key) {
      case 'nodes':
        value = yield call(submitNodeOperations, action)
        break
      case 'credentials':
        value = yield call(submitDeleteCredentialOperation, action)
        break
      case 'mqqueue':
        value = yield call(submitDeleteQueueOperation, action)

        break
    }
    yield put({ type: OPERATION_SUBMIT_SUCCESSFUL, value })
    const redirectUrl = value.orderId ? `/orders/${value.orderId}` : '/'
    yield history.push(redirectUrl)
    yield put({ type: HISTORY_REQUEST })
  } catch (error) {
    yield put({ type: OPERATION_SUBMIT_FAILED, error })
  }
}

export function* watchOperations() {
  yield fork(takeEvery, SUBMIT_OPERATION, submitOperation)
  yield fork(takeLatest, CREDENTIAL_LOOKUP_REQUEST, credentialLookup)
  yield fork(takeLatest, CUSTOM_CREDENTIAL_LOOKUP_REQUEST, customCredentialLookup)
}
