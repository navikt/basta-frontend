import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { postForm, getUrl, putForm } from '../common/utils'
import {
  POST_NOTIFICATION,
  POST_NOTIFICATION_SUBMITTING,
  POST_NOTIFICATION_SUCCESSFUL,
  POST_NOTIFICATION_FAILED,
  NOTIFICATIONS_REQUEST,
  ACTIVE_NOTIFICATIONS_RECEIVED,
  NOTIFICATIONS_REQUEST_FAILED,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_FAILED
} from '../actionTypes'

export function* postNotification(action) {
  yield put({ type: POST_NOTIFICATION_SUBMITTING })

  try {
    yield call(postForm, '/rest/system/notifications/create', action.messagePayload)
    yield put({ type: POST_NOTIFICATION_SUCCESSFUL })
    yield put({
      type: NOTIFICATIONS_REQUEST
    })
  } catch (error) {
    yield put({ type: POST_NOTIFICATION_FAILED, error })
  }
}

export function* fetchActiveNotifications() {
  try {
    const activeNotifications = yield call(getUrl, '/rest/system/notifications/active')
    yield put({
      type: ACTIVE_NOTIFICATIONS_RECEIVED,
      value: activeNotifications
    })
  } catch (err) {
    yield put({ type: NOTIFICATIONS_REQUEST_FAILED, err })
  }
}

export function* removeNotification(action) {
  try {
    yield call(putForm, `/rest/system/notifications/${action.id}/inactive`)
    yield put({
      type: NOTIFICATIONS_REQUEST
    })
  } catch (err) {
    yield put({ type: REMOVE_NOTIFICATION_FAILED, err })
  }
}

export function* watchNotification() {
  yield fork(takeEvery, POST_NOTIFICATION, postNotification)
  yield fork(takeEvery, NOTIFICATIONS_REQUEST, fetchActiveNotifications)
  yield fork(takeEvery, REMOVE_NOTIFICATION, removeNotification)
}
