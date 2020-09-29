import { expectSaga } from 'redux-saga-test-plan'
import { credentialLookup, submitOperation } from './operateSagas'
import operateReducers from './operateReducers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl, postForm } from '../common/utils'

it('(Operate view sagas - credentialLookup) disoatches with app, and sets all fields to false', () => {
  const action = {
    type: 'CREDENTIAL_LOOKUP_REQUEST',
    form: { environmentClass: 'u', zone: 'fss', application: 'sera' }
  }
  return expectSaga(credentialLookup, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(getUrl), false]])
    .hasFinalState({
      ...defaultOperationsState,
      credentialLookup: {
        fetching: false,
        lookupComplete: true,
        error: null,
        data: { existInAD: false, existInFasit: false, user: false }
      }
    })
    .run()
})

it('(Operate view sagas - credentialLookup) dispatches with app, returns fetch error and default values', () => {
  const action = {
    type: 'CREDENTIAL_LOOKUP_REQUEST',
    form: { environmentClass: 'u', zone: 'fss', application: 'sera' }
  }
  const error = Error('error')
  return expectSaga(credentialLookup, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(getUrl), throwError(error)]])
    .hasFinalState({
      ...defaultOperationsState,
      credentialLookup: {
        fetching: false,
        lookupComplete: false,
        error: error,
        data: { existInAD: false, existInFasit: false, user: {} }
      }
    })
    .run()
})

it('(Operate view sagas - submitOperation) dispatches with operation, returns orderId', () => {
  const action = {
    type: 'SUBMIT_OPERATION',
    key: 'nodes',
    operation: 'start',
    form: ['host1', 'host2.fqdn.com']
  }
  const res = { orderId: '6969' }
  return expectSaga(submitOperation, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(postForm), res]])
    .hasFinalState({
      operations: {
        fetching: false,
        error: null,
        lastOrderId: res.orderId
      },
      credentialLookup: {
        fetching: false,
        lookupComplete: false,
        error: null,
        data: {
          existInAD: false,
          existInFasit: false,
          user: {}
        }
      }
    })
    .run()
})

it('(Operate view sagas - submitOperation) dispatches with operation, returns fetch error and default values', () => {
  const action = {
    type: 'SUBMIT_OPERATION',
    key: 'credentials',
    form: { environmentClass: 'u', zone: 'fss', application: 'sera' }
  }
  const error = Error('error')
  return expectSaga(submitOperation, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(postForm), throwError(error)]])
    .hasFinalState({
      ...defaultOperationsState,
      operations: {
        fetching: false,
        error: error,
        lastOrderId: null
      }
    })
    .run()
})

// MOCK DATA

const defaultOperationsState = {
  operations: { fetching: false, error: null, lastOrderId: null },
  credentialLookup: {
    fetching: false,
    error: null,
    lookupComplete: false,
    data: { existInAD: false, existInFasit: false, user: {} }
  }
}
