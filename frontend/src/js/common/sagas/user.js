import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, getUserPhoto } from '../utils'
import { api } from '../../../../../api/config/config'
import {
  POLL_SESSION_START,
  USER_SESSION_REQUEST,
  USER_SESSION_FETCHING,
  USER_SESSION_RECEIVED,
  USER_SESSION_REQUEST_FAILED
} from '../actionTypes'

const url = `${api}`

export function* sessionLookUp() {
  let value = ''
  let userPhoto = ''
  yield put({ type: USER_SESSION_FETCHING })
  try {
    value = yield call(getUrl, `${url}/auth/session`)
    yield put({ type: USER_SESSION_RECEIVED, value })
    yield put({ type: POLL_SESSION_START })
  } catch (err) {
    yield put({ type: USER_SESSION_REQUEST_FAILED, err })
  }
}

export function* watchUser() {
  yield fork(takeEvery, USER_SESSION_REQUEST, sessionLookUp)
}
