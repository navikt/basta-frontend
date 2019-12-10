import { SUBMIT_FORM, ORDER_REQUEST, STATUSLOG_REQUEST, RESET_FORM } from '../actionTypes'

export const submitForm = (form, apiPath) => {
  return { type: SUBMIT_FORM, orders: form, apiPath: apiPath }
}

export const resetForm = () => {
  return { type: RESET_FORM }
}

export const getStatusLog = orderId => {
  return { type: STATUSLOG_REQUEST, orderId }
}
export const getOrder = orderId => {
  return { type: ORDER_REQUEST, orderId }
}
