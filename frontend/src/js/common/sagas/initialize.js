import { put, fork, takeEvery, take } from 'redux-saga/effects'
import {
  INITIALIZE_APPLICATION,
  APPLICATION_READY,
  USER_PROFILE_REQUEST
} from '../../actionTypes'

export function* initializeApplication() {
  yield put({ type: USER_PROFILE_REQUEST })
  const result = yield take(['USER_PROFILE_RECEIVED', 'USER_PROFILE_REQUEST_FAILED'])
  switch (result.type) {
    case 'USER_PROFILE_RECEIVED':
      yield put({ type: APPLICATION_READY })
      break
    case 'USER_PROFILE_REQUEST_FAILED':
      yield put({ type: APPLICATION_READY })
      break
  }
}

export function* watchInitialize() {
  yield fork(takeEvery, INITIALIZE_APPLICATION, initializeApplication)
}
