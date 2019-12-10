import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { submitForm, getStatusLog, getOrderDetails } from './create/createOrderSagas'
import orderReducer from '../containers/order/reducers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl, postForm } from '../common/utils'

it('(Order view sagas - submitForm) POSTs form and stores response in store', () => {
  const action = {
    key: 'wasnode',
    orders: []
  }
  const value = {
    id: 6969
  }
  return expectSaga(submitForm, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(postForm), value]])
    .put({
      type: 'FORM_SUBMITTING'
    })
    .put({
      type: 'FORM_SUBMIT_SUCCESSFUL',
      value: value
    })
    .hasFinalState({
      form: { submitting: false, id: 6969, error: null },
      details: { fetching: false, data: null, error: null },
      statuslog: { fetching: false, data: null, error: null }
    })
    .run()
})

it('(Order view sagas - submitForm) handles errors', () => {
  const action = {
    key: 'wasnode',
    orders: []
  }
  const err = Error('error')
  return expectSaga(submitForm, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(postForm), throwError(err)]])
    .put({
      type: 'FORM_SUBMITTING'
    })
    .put({
      type: 'FORM_SUBMIT_FAILED',
      error: err
    })
    .hasFinalState({
      form: { submitting: false, id: null, error: err },
      details: { fetching: false, data: null, error: null },
      statuslog: { fetching: false, data: null, error: null }
    })
    .run()
})

it('(Order view sagas - getStatusLog) GETs statuslog and stores it in store ', () => {
  const action = {}
  const value = {
    id: 6969
  }
  return expectSaga(getStatusLog, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(getUrl), value]])
    .put({
      type: 'STATUSLOG_FETCHING'
    })
    .put({
      type: 'STATUSLOG_RECEIVED',
      value: value
    })
    .hasFinalState({
      form: { submitting: false, id: null, error: null },
      details: { fetching: false, data: null, error: null },
      statuslog: { fetching: false, data: { id: 6969 }, error: null }
    })
    .run()
})

it('(Order view sagas - getStatusLog) handles errors', () => {
  const action = {}
  const err = Error('error')
  return expectSaga(getStatusLog, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'STATUSLOG_FETCHING'
    })
    .put({
      type: 'STATUSLOG_REQUEST_FAILED',
      error: err
    })
    .hasFinalState({
      form: { submitting: false, id: null, error: null },
      details: { fetching: false, data: null, error: null },
      statuslog: { fetching: false, data: null, error: err }
    })
    .run()
})

it('(Order view sagas - getOrderDetails) GETs order details and stores it in store ', () => {
  const action = {}
  const value = {
    id: 6969
  }
  return expectSaga(getOrderDetails, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(getUrl), value]])
    .put({
      type: 'ORDER_FETCHING'
    })
    .put({
      type: 'ORDER_RECEIVED',
      value: value
    })
    .hasFinalState({
      form: { submitting: false, id: null, error: null },
      details: { fetching: false, data: { id: 6969 }, error: null },
      statuslog: { fetching: false, data: null, error: null }
    })
    .run()
})

it('(Order view sagas - getOrderDetails) handles errors', () => {
  const action = {}
  const err = Error('error')
  return expectSaga(getOrderDetails, action)
    .withReducer(orderReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'ORDER_FETCHING'
    })
    .put({
      type: 'ORDER_REQUEST_FAILED',
      error: err
    })
    .hasFinalState({
      form: { submitting: false, id: null, error: null },
      details: { fetching: false, data: null, error: err },
      statuslog: { fetching: false, data: null, error: null }
    })
    .run()
})

////////////////////////////////MOCKS//////////////////////////////////////////////
