import { SUBMIT_FORM, ORDER_REQUEST, STATUSLOG_REQUEST } from './actionTypes'

export const submitForm = (key, form) => {

  return { type: SUBMIT_FORM, key, orders: form }
}
export const getStatusLog = orderId => {
  return { type: STATUSLOG_REQUEST, orderId }
}
export const getOrder = orderId => {
  return { type: ORDER_REQUEST, orderId }
}
