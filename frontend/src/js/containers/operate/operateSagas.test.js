import { select, call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { fetchVmInfo, credentialLookup, submitOperation } from './operateSagas'
import operateReducers from './operateReducers'
import { getLastQuery } from './operateSelectors'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl, postForm } from '../../common/utils'

it('(Operate view sagas - fetchVmInfo) dispatches with hostnames, fetches data for borth servers if request is unique', () => {
  const action = { type: 'VMLOOKUP_REQUEST', hostnames: ['a.a.a', 'b.b.b'] }
  return expectSaga(fetchVmInfo, action)
    .withReducer(operateReducers)
    .provide([[select(getLastQuery), null], [matchers.call.fn(getUrl), vmInfo]])
    .hasFinalState({
      ...defaultOperationsState,
      vmLookup: {
        fetching: false,
        error: null,
        lastQuery: '/rest/v1/servers?hostname=a.a.a&hostname=b.b.b&',
        data: vmInfo
      }
    })
    .run()
})

it('(Operate view sagas - fetchVmInfo) dispatches with hostnames, returns fetch error', () => {
  const action = { type: 'VMLOOKUP_REQUEST', hostnames: ['a.a.a', 'b.b.b'] }
  const error = Error('error')
  return expectSaga(fetchVmInfo, action)
    .withReducer(operateReducers)
    .provide([[select(getLastQuery), null], [matchers.call.fn(getUrl), throwError(error)]])
    .hasFinalState({
      ...defaultOperationsState,
      vmLookup: { fetching: false, error, data: [] }
    })
    .run()
})

it('(Operate view sagas - credentialLookup) disoatches with app, and sets all fields to false', () => {
  const action = {
    type: 'CREDENTIAL_LOOKUP_REQUEST',
    form: { environmentClass: 'u', zone: 'fss', applicationMappingName: 'sera' }
  }
  return expectSaga(credentialLookup, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(getUrl), false]])
    .hasFinalState({
      ...defaultOperationsState,
      credentialLookup: {
        fetching: false,
        error: null,
        data: { existInAD: false, existInFasit: false, user: false }
      }
    })
    .run()
})

it('(Operate view sagas - credentialLookup) disoatches with app, returns fetch error and default values', () => {
  const action = {
    type: 'CREDENTIAL_LOOKUP_REQUEST',
    form: { environmentClass: 'u', zone: 'fss', applicationMappingName: 'sera' }
  }
  const error = Error('error')
  return expectSaga(credentialLookup, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(getUrl), throwError(error)]])
    .hasFinalState({
      ...defaultOperationsState,
      credentialLookup: {
        fetching: false,
        error: error,
        data: { existInAD: true, existInFasit: true, user: {} }
      }
    })
    .run()
})

it('(Operate view sagas - submitOperation) disoatches with operation, returns orderId', () => {
  const action = {
    type: 'SUBMIT_OPERATION',
    key: 'credentials',
    operation: 'start',
    form: { environmentClass: 'u', zone: 'fss', applicationMappingName: 'sera' }
  }
  const res = { orderId: '6969' }
  return expectSaga(submitOperation, action)
    .withReducer(operateReducers)
    .provide([[matchers.call.fn(postForm), res]])
    .hasFinalState({
      ...defaultOperationsState,
      operations: {
        fetching: false,
        error: null,
        lastOrderId: res.orderId
      }
    })
    .run()
})

it('(Operate view sagas - submitOperation) disoatches with operation, returns fetch error and default values', () => {
  const action = {
    type: 'SUBMIT_OPERATION',
    key: 'credentials',
    operation: 'start',
    form: { environmentClass: 'u', zone: 'fss', applicationMappingName: 'sera' }
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
  vmLookup: { fetching: false, error: null, lastQuery: null, data: [] },
  credentialLookup: {
    fetching: false,
    error: null,
    data: { existInAD: true, existInFasit: true, user: {} }
  }
}

const vmInfo = [
  {
    hostname: 'a.a.a',
    os: 'Red Hat Enterprise Linux 6 (64-bit)',
    uuid: 'VMware-42 0f b9 9f 91 41 5f ef-ff 33 ff 30 6b 55 92 a7',
    environmentClass: 'q',
    type: 'jboss',
    site: 'so8',
    memory: 2,
    cpu: 1,
    disk: 76,
    status: 'poweredOff',
    custom: false,
    owner: 'b123034',
    application: 'signering',
    environment: 'q2',
    created: '2018-01-08T09:36:22.468Z',
    environmentName: 'n/a',
    rpm_time: '2018-01-08T09:45:29Z',
    rpm_version: '7.0.4.2-1',
    rpm_rpm: 'jboss-eap7',
    unit: 'kes'
  },
  {
    hostname: 'b.b.b',
    os: 'Red Hat Enterprise Linux 6 (64-bit)',
    uuid: 'VMware-42 0f b9 9f 91 41 5f ef-ff 33 ff 30 6b 55 92 a7',
    environmentClass: 'q',
    type: 'jboss',
    site: 'so8',
    memory: 2,
    cpu: 1,
    disk: 76,
    status: 'poweredOff',
    custom: false,
    owner: 'b123034',
    application: 'signering',
    environment: 'q2',
    created: '2018-01-08T09:36:22.468Z',
    environmentName: 'n/a',
    rpm_time: '2018-01-08T09:45:29Z',
    rpm_version: '7.0.4.2-1',
    rpm_rpm: 'jboss-eap7',
    unit: 'kes'
  }
]
