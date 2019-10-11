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
  LATEST_ORDER_REQUEST
} from '../../actionTypes'

export function* submitForm(action) {
  let value = ''
  yield put({ type: FORM_SUBMITTING })

  try {
    switch (action.key) {
      case 'bigip':
        const bigIpPayload = {
          ...action.orders,
          useHostnameMatching: action.orders.matchingTypes === 'hostname' ? 'true' : 'false'
        }
        value = yield call(postForm, `/rest/v1/bigip`, bigIpPayload)
        break
      case 'bpmdmgr':
        value = yield call(postForm, `/rest/vm/orders/bpm/dmgr`, action.orders)
        break
      case 'bpmnode':
        value = yield call(postForm, `/rest/vm/orders/bpm/node`, action.orders)
        break
      case 'containerlinux':
        value = yield call(postForm, `/rest/vm/orders/containerlinux`, action.orders)
        break
      case 'iapptools':
        value = yield call(postForm, `/rest/vm/orders/iapptools`, action.orders)
        break
      case 'developertools':
        const orderPayload = {
          ...action.orders,
          environmentClass: 'u',
          zone: 'fss'
        }
        value = yield call(postForm, `/rest/vm/orders/devtools`, orderPayload)
        break
      case 'jbossnode':
        value = yield call(postForm, `/rest/vm/orders/jboss`, action.orders)
        break
      case 'liberty':
        value = yield call(postForm, `/rest/vm/orders/liberty`, action.orders)
        break
      case 'redhat':
        value = yield call(postForm, `/rest/vm/orders/linux`, action.orders)
        break
      case 'openamproxy':
        value = yield call(postForm, `/rest/vm/orders/openam/proxy`, action.orders)
        break
      case 'openamserver':
        value = yield call(postForm, `/rest/vm/orders/openam/server`, action.orders)
        break
      case 'oracle':
        //dbTemplate is an object. We need to remove that from the payload and get the dbTemplate.value and set it as templateURI
        const { dbTemplate, ...dbPayload } = action.orders
        const dbOrderPayload = {
          ...dbPayload,
          templateURI: dbTemplate.value
        }
        value = yield call(postForm, `/rest/v1/oracledb`, dbOrderPayload)
        break
      case 'certificate':
        value = yield call(postForm, `/rest/orders/serviceuser/certificate`, action.orders)
        break
      case 'credential':
        value = yield call(postForm, `/rest/orders/serviceuser/credential`, action.orders)
        break
      case 'wasdmgr':
        value = yield call(postForm, `/rest/vm/orders/was/dmgr`, action.orders)
        break
      case 'wasnode':
        value = yield call(postForm, `/rest/vm/orders/wasnode`, action.orders)
        break
      case 'wildflynode':
        value = yield call(postForm, `/rest/vm/orders/wildfly`, action.orders)
        break
      case 'windows':
        value = yield call(postForm, `/rest/vm/orders/windows`, action.orders)
        break
      case 'channel':
        value = yield call(postForm, '/rest/v1/mq/order/channel', action.orders)
        break
      case 'queue':
        // Remove fields name and exposed from orders as this is not needed by basta api
        const { name, exposed, ...payload } = action.orders
        value = yield call(postForm, '/rest/v1/mq/order/queue', payload)
        break
    }
    yield put({ type: FORM_SUBMIT_SUCCESSFUL, value })

    const orderId = value.id ? value.id : value

    yield history.push(`/orders/${orderId}`)
    yield put({ type: LATEST_ORDER_REQUEST })
  } catch (error) {
    yield put({ type: FORM_SUBMIT_FAILED, error })
  }
}

export function* getStatusLog(action) {
  try {
    yield put({ type: STATUSLOG_FETCHING })
    const value = yield call(getUrl, `/rest/orders/${action.orderId}/statuslog/`)
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
