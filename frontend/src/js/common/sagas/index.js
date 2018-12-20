import { all, call } from 'redux-saga/effects'
import { watchUser } from './user'
import { watchInitialize } from './initialize'
import { watcHistory } from '../../containers/history/sagas'
import { watchOrderData } from './orderformData'
import { watchOperations } from './operationsForm'
import { watchOrder } from '../../containers/order/sagas'

export default function*() {
  yield all([
    call(watchUser),
    call(watcHistory),
    call(watchInitialize),
    call(watchOrder),
    call(watchOrderData),
    call(watchOperations)
  ])
}
