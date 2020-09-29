import { expectSaga } from 'redux-saga-test-plan'
import { getOrderHistory } from './historySagas'
import historyReducer from './historyReducers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { getUrl } from '../common/utils'

it('(History view sagas - getOrderHistory) fetches orders from backend', () => {
  const action = {}
  return expectSaga(getOrderHistory, action)
    .withReducer(historyReducer)
    .provide({
      call(effect, next) {
        if (effect.fn === getUrl) {
          return plainOrders
        }
        return next()
      }
    })
    .put({
      type: 'HISTORY_FETCHING'
    })
    .put({
      type: 'HISTORY_RECEIVED',
      orders: plainOrders
    })
    .hasFinalState({
      orderHistory: plainOrders,
      filterApplied: false,
      searchProcessing: false,
      totalOrders: 2,
      orderHistoryReceived: true,
      requestFailed: false,
      errorMessage: ''
    })
    .run()
})

it('(History view sagas - getOrderHistory) handles errors', () => {
  const action = {}
  const err = Error('error')
  return expectSaga(getOrderHistory, action)
    .withReducer(historyReducer)
    .provide([[matchers.call.fn(getUrl), throwError(err)]])
    .put({
      type: 'HISTORY_FETCHING'
    })
    .put({
      type: 'HISTORY_REQUEST_FAILED',
      err: err
    })
    .hasFinalState({
      orderHistory: [],
      filterApplied: false,
      searchProcessing: false,
      totalOrders: 0,
      orderHistoryReceived: false,
      requestFailed: true,
      errorMessage: err
    })
    .run()
})

//////////////////////////////////MOCKS//////////////////////////////////////////////

const plainOrders = [
  {
    id: 24403,
    created: 1534318234218,
    createdBy: 'h151388',
    updated: 1534319387631,
    updatedBy: 'srvOrchestrator',
    updatedByDisplayName: 'Service User',
    createdByDisplayName: 'Even Hansen',
    orderType: 'VM',
    results: ['d26jbsl01518.test.local'],
    input: null,
    externalId:
      'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c7e4cd2303d/',
    uri: 'https://basta.adeo.no/rest/orders/24403',
    status: 'SUCCESS',
    errorMessage: null,
    orderDescription: 'WILDFLY',
    orderOperation: 'CREATE',
    nextOrderId: null,
    previousOrderId: null,
    resultDetails: []
  },
  {
    id: 24402,
    created: 1534315029884,
    createdBy: 'srvfasit',
    updated: 1534315061586,
    updatedBy: 'srvOrchestrator',
    updatedByDisplayName: 'Service User',
    createdByDisplayName: 'Service User',
    orderType: 'VM',
    results: ['d26jbsl01518.test.local'],
    input: null,
    externalId:
      'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
    uri: 'https://basta.adeo.no/rest/orders/24402',
    status: 'ERROR',
    errorMessage: null,
    orderDescription: 'JBOSS',
    orderOperation: 'DELETE',
    nextOrderId: null,
    previousOrderId: null,
    resultDetails: []
  }
]
