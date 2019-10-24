import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { postForm } from '../common/utils'
import {
  POST_NOTIFICATION,
  POST_NOTIFICATION_SUBMITTING,
  POST_NOTIFICATION_SUCCESSFUL,
  POST_NOTIFICATION_FAILED
} from '../actionTypes'

export function* postNotification(action) {
  yield put({ type: POST_NOTIFICATION_SUBMITTING })

  try {
    yield call(postForm, '/rest/system/notifications/create', action.messagePayload)
    yield put({ type: POST_NOTIFICATION_SUCCESSFUL })
  } catch (error) {
    yield put({ type: POST_NOTIFICATION_FAILED, error })
  }
}

export function* watchNotification() {
  yield fork(takeEvery, POST_NOTIFICATION, postNotification)
}
