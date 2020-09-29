import { all, call } from 'redux-saga/effects'
import { watchUser } from './user'
import { watchInitialize } from './initialize'
import { watcHistory } from '../../history/historySagas'
import { watchOrderData } from './orderformData'
import { watchOperations } from '../../operations/operateSagas'
import { watchOrder } from '../../order/create/createOrderSagas'
import { watchNotification } from '../../notifications/notificationsSaga'

export default function*() {
  yield all([
    call(watchUser),
    call(watcHistory),
    call(watchInitialize),
    call(watchOrder),
    call(watchOrderData),
    call(watchOperations),
    call(watchNotification)
  ])
}
