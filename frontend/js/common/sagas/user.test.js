import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { fetchUserProfile, logoutUser } from './user'
import userReducer from '../reducers/user'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl, postForm } from '../../common/utils'

it('(Saga - fetchUserProfile) GETs user object and stores it in store ', () => {
  const action = {}
  const value = {
    id: 6969
  }
  return expectSaga(fetchUserProfile, action)
    .withReducer(userReducer)
    .provide([[matchers.call.fn(getUrl), value]])
    .put({
      type: 'USER_PROFILE_FETCHING'
    })
    .put({
      type: 'USER_PROFILE_RECEIVED',
      value: value
    })
    .hasFinalState({
      userProfile: { id: 6969 },
      isUserAuthenticated: true,
      isFetching: false,
      requestFailed: false,
      requestStatus: 'User profile lookup successful'
    })
    .run()
})

it('(Sagas - fetchUserProfile) handles errors', () => {
  const action = {}
  const err = Error('error')
  return expectSaga(fetchUserProfile, action)
    .withReducer(userReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'USER_PROFILE_FETCHING'
    })
    .put({
      type: 'USER_PROFILE_REQUEST_FAILED',
      err: err
    })
    .hasFinalState({
      userProfile: {},
      isUserAuthenticated: false,
      isFetching: false,
      requestFailed: true,
      requestStatus: err
    })
    .run()
})

it('(Saga - logoutUser) GETs user logout endpoint and updates user session locally ', () => {
  const action = {}
  const value = null
  return expectSaga(logoutUser, action)
    .withReducer(userReducer)
    .provide([[matchers.call.fn(getUrl), value]])
    .put({
      type: 'USER_SESSION_EXPIRED'
    })
    .hasFinalState({
      userProfile: {},
      isUserAuthenticated: false,
      isFetching: false,
      requestFailed: false,
      requestStatus: 'Session expired'
    })
    .run()
})

it('(Sagas - logoutUser) handles errors', () => {
  const action = {}
  const err = Error('error')
  return expectSaga(logoutUser, action)
    .withReducer(userReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'USER_PROFILE_REQUEST_FAILED',
      err: err
    })
    .hasFinalState({
      userProfile: {},
      isUserAuthenticated: false,
      isFetching: false,
      requestFailed: true,
      requestStatus: err
    })
    .run()
})

////////////////////////////////MOCKS//////////////////////////////////////////////
